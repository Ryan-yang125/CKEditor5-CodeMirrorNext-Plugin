import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView, keymap } from '@codemirror/view';
import { Compartment } from '@codemirror/state';
import { defaultTabBinding } from '@codemirror/commands';
import { StreamLanguage } from '@codemirror/stream-parser';
import { ToeTheme, ToeHighlightStyle } from './theme/toe-code-block-theme';
import { getStreamLanguage } from './lang';
import CodePanel from './codepanel';

const defaultConfigs = {
    ifLineWrapping: false,
};
export default (domElement, language, sourceCode, modelElement, model) => {
    let languageCompartment = new Compartment(),
        lineWrappingCompartment = new Compartment(),
        panelCompartment = new Compartment();
    const { streamLanguage, label } = getStreamLanguage(language);

    // add view updateListener to keep new doc up with dom element
    const onDocChange = EditorView.updateListener.of(v => {
        if (v.docChanged) {
            // Document changed
            model.change(writer => {
                writer.setAttribute('source-code', v.state.doc.toString(), modelElement);
            });
        }
    });

    // init editor state with extensions
    const state = EditorState.create({
        doc: sourceCode || '',
        extensions: [
            basicSetup,
            panelCompartment.of(CodePanel(label)),
            keymap.of([defaultTabBinding]),
            languageCompartment.of(StreamLanguage.define(streamLanguage)),
            ToeTheme,
            // ToeHighlightStyle,
            onDocChange,
            lineWrappingCompartment.of(defaultConfigs.ifLineWrapping ? EditorView.lineWrapping : []),
        ],
    });

    // mount to dom
    const codeView = new EditorView({
        state: state,
        parent: domElement,
    });

    // when browser loaded document, we can't do focus rightly
    // put it into a macro queue which is lower than render in priority
    setTimeout(() => {
        codeView.focus();
    });

    // Language selector onChange,
    // 1.change the attribute of model elem in CKEditor
    // 2.change the StreamLanguage in Codemirror
    const onLangChange = (modelElement, model, language) => {
        model.change(writer => {
            // writer.removeAttribute('language', modelElement);
            writer.setAttribute('language', language, modelElement);
        });
        codeView.dispatch({
            effects: languageCompartment.reconfigure(StreamLanguage.define(getStreamLanguage(language).streamLanguage)),
        });
    };

    // Auto line break switcher onChange
    const onLineWrappingChange = ifLineWrapping => {
        codeView.dispatch({
            effects: lineWrappingCompartment.reconfigure(ifLineWrapping ? EditorView.lineWrapping : []),
        });
    };

    // a weired solution using closure to dispatch listener to CodePanel
    codeView.dispatch({
        effects: panelCompartment.reconfigure(
            CodePanel(label, onLangChange.bind(null, modelElement, model), onLineWrappingChange),
        ),
    });
};
