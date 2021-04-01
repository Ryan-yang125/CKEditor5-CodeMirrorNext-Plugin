import Plugin from '../../ckeditor5-core/src/plugin';
import Widget from '../../ckeditor5-widget/src/widget';
import { toWidget, viewToModelPositionOutsideModelElement } from '../../ckeditor5-widget/src/utils';
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
    }
    init() {
        this._defineSchema();

        this.editor.commands.add('codeBlock', new codeBlockCommand(this.editor));
        // this.editor.commands.add('updateCodeMirror', new UpdateCodeMirrorCommand(this.editor));

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
            allowAttributes: ['language', 'sourceCode'],
        });
    }

    _defineConverters() {
        const editor = this.editor;
        const conversion = this.editor.conversion;

        //view => model
        conversion.for('upcast').elementToElement({
            view: {
                name: 'div',
                classes: 'code-mirror',
            },
            model: (viewElement, { writer }) => {
                const language = viewElement.getAttribute('language');
                const sourceCode = viewElement.getAttribute('source-code');
                return writer.createElement('codeMirror', {
                    language: viewElement.getAttribute('language'),
                    'source-code': viewElement.getAttribute('source-code'),
                });
            },
        });

        // model => data view
        conversion.for('dataDowncast').elementToElement({
            model: 'codeMirror',
            view: (modelElement, { writer }) => {
                const modelElemConfig = {
                    class: 'code-mirror',
                    language: modelElement.getAttribute('language') || 'textile',
                    'source-code': modelElement.getAttribute('source-code') || '',
                };
                return writer.createRawElement('div', modelElemConfig);
            },
        });

        // model => editing view
        conversion.for('editingDowncast').elementToElement({
            model: 'codeMirror',
            view: creatCodeMirrorView,
        });

        function creatCodeMirrorView(modelElement, { writer }) {
            const language = modelElement.getAttribute('language');
            const sourceCode = modelElement.getAttribute('source-code');
            const classes = `code-mirror-${language}`;
            const viewContainer = writer.createContainerElement('div', {
                class: classes,
            });
            const viewContentWrapper = writer.createRawElement(
                'div',
                { class: `${classes}__content-wrapper`, 'data-cke-ignore-events': true },
                domElement => {
                    renderContent(domElement, language, sourceCode, modelElement, editor.model);
                    domElement.addEventListener('copy', evt => {
                        evt.stopPropagation();
                    });
                    domElement.addEventListener('paste', evt => {
                        evt.stopPropagation();
                    });
                },
            );

            writer.insert(writer.createPositionAt(viewContainer, 0), viewContentWrapper);

            return toWidget(viewContainer, writer, {
                widgetLabel: 'Code Mirror',
            });
        }

        function renderContent(domElement, language, sourceCode, modelElement, model) {
            codeBlockEmbled(domElement, language, sourceCode, modelElement, model);
        }
    }
}
