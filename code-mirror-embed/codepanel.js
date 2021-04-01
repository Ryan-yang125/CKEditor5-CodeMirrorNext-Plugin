import { Panel, showPanel } from '@codemirror/panel';
import TopPanel from './ui/toppanel';
import ReactDOM from 'react-dom';

function codePanel(language, onLangChange, onLineWrappingChange) {
    let dom = document.createElement('div');
    dom.style.outline = 'none';
    dom.style.backgroundColor = '#eff0f1';
    dom.style.height = '32px';
    ReactDOM.render(
        <TopPanel language={language} onLangChange={onLangChange} onLineWrappingChange={onLineWrappingChange} />,
        dom,
    );
    return {
        top: true,
        dom,
    };
}

export default (language, onLangChange, onLineWrappingChange) =>
    showPanel.of(codePanel.bind(this, language, onLangChange, onLineWrappingChange));
