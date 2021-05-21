import Plugin from '../../ckeditor5-core/src/plugin';
import Widget from '../../ckeditor5-widget/src/widget';
import { toWidget, viewToModelPositionOutsideModelElement } from '../../ckeditor5-widget/src/utils';
import viewToPlainText from '../../ckeditor5-clipboard/src/utils/viewtoplaintext';
import codeBlockCommand from './codeblockcommand';
import codeBlockEmbled from '../code-mirror-embed/index';

export default class CodeBlockEditing extends Plugin {
    static get requires() {
        return [Widget];
    }

    static get pluginName() {
        return 'CodeMirrorEditing';
    }

    constructor(editor) {
        super(editor);
        this._stopPropagationEvents = ['copy', 'paste', 'cut', 'contextmenu'];
    }
    init() {
        this._defineSchema();

        this.editor.commands.add('codeBlock', new codeBlockCommand(this.editor));

        this._defineConverters();

        this.editor.editing.mapper.on(
            'viewToModelPosition',
            viewToModelPositionOutsideModelElement(this.editor.model, viewElement =>
                viewElement.hasClass('code-mirror'),
            ),
        );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;
        schema.register('codeMirror', {
            allowWhere: '$block',
            isObject: true,
            allowAttributes: ['language', 'source-code'],
        });
    }

    _defineConverters() {
        const editor = this.editor;
        const conversion = this.editor.conversion;
        const stopPropagationEvents = this._stopPropagationEvents;

        //view => model
        conversion
            .for('upcast')
            .elementToElement({
                view: {
                    name: 'pre',
                },
                model: (viewElement, { writer }) => {
                    const codeView = viewElement.getChild(0);
                    if (codeView.name !== 'code') return;
                    const language = /language-(.*)/.exec(codeView.getAttribute('class'))?.[1] || 'textile';
                    return writer.createElement('codeMirror', {
                        language: language,
                        'source-code': viewToPlainText(codeView),
                    });
                },
            }) // TODO hot fix data view of code block. this conversion will be deprecated in the future
            .elementToElement({
                view: {
                    name: 'div',
                    classes: 'code-mirror',
                },
                model: (viewElement, { writer }) => {
                    return writer.createElement('codeMirror', {
                        language: viewElement.getAttribute('language'),
                        'source-code': viewElement.getAttribute('source-code'),
                    });
                },
                converterPriority: 'high',
            });

        // model => data view
        conversion.for('dataDowncast').elementToElement({
            model: 'codeMirror',
            view: (modelElement, { writer }) => {
                const language = modelElement.getAttribute('language') || 'textile';
                const code = modelElement.getAttribute('source-code') || '';

                const container = writer.createContainerElement('pre');

                const codeView = writer.createRawElement(
                    'code',
                    {
                        class: `language-${language}`,
                    },
                    domElement => {
                        domElement.innerHTML = code;
                    },
                );

                writer.insert(writer.createPositionAt(container, 0), codeView);

                return container;
            },
        });

        // model => editing view
        const editingDowncastConversionHelper =  conversion.for('editingDowncast').elementToElement({
            model: 'codeMirror',
            view: creatCodeMirrorView,
        })

        function creatCodeMirrorView(modelElement, { writer }) {
            const language = modelElement.getAttribute('language');
            const sourceCode = modelElement.getAttribute('source-code');
            const classes = `code-mirror code-mirror-${language}`;
            const viewContainer = writer.createContainerElement('div', {
                class: classes,
            });
            const viewContentWrapper = updateRender(writer, language, sourceCode, modelElement,viewContainer);
            writer.insert(writer.createPositionAt(viewContainer, 0), viewContentWrapper);

            return toWidget(viewContainer, writer, {
                widgetLabel: 'Code Mirror',
                hasSelectionHandle: true,
            });
        }

        function updateRender(writer, language, sourceCode, modelElement,viewContainer) {
            const classes = `code-mirror code-mirror-${language}`;
            const viewContentWrapper = writer.createRawElement(
                'div',
                { class: `${classes}__content-wrapper`, 'data-cke-ignore-events': false },
                domElement => {
                    renderContent(domElement, language, sourceCode, modelElement, editor.model);

                    stopPropagationEvents.forEach(evtItem => {
                        domElement.addEventListener(evtItem, evt => {
                            evt.stopPropagation();
                        });
                    });
                },
            );
            return viewContentWrapper;
        }
        function renderContent(domElement, language, sourceCode, modelElement, model) {
            // clear margin left and right
            domElement.style.margin = '16px 0 16px 0';
            codeBlockEmbled(domElement, language, sourceCode, modelElement, model,editingDowncastConversionHelper);
        }
    }
}
