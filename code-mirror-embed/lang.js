import { c, cpp, java } from '@codemirror/legacy-modes/mode/clike';
import { python } from '@codemirror/legacy-modes/mode/python';
import { javascript, typescript } from '@codemirror/legacy-modes/mode/javascript';
import { ruby } from '@codemirror/legacy-modes/mode/ruby';
import { textile } from '@codemirror/legacy-modes/mode/textile';
import { css } from '@codemirror/legacy-modes/mode/css';
const defaulLanguage = 'textile';

const languageSupport = [
    {
        language: 'textile',
        label: 'Plain text',
        mode: textile,
    },
    {
        language: 'c',
        label: 'C',
        mode: c,
    },
    {
        language: 'cpp',
        label: 'C++',
        mode: cpp,
    },
    {
        language: 'java',
        label: 'Java',
        mode: java,
    },
    {
        language: 'css',
        label: 'CSS',
        mode: css,
    },
    {
        language: 'javascript',
        label: 'JavaScript',
        mode: javascript,
    },
    {
        language: 'python',
        label: 'Python',
        mode: python,
    },
    {
        language: 'ruby',
        label: 'Ruby',
        mode: ruby,
    },
    {
        language: 'typescript',
        label: 'TypeScript',
        mode: typescript,
    },
];
const languageConfigs = {
    c,
    cpp,
    java,
    python,
    javascript,
    typescript,
    css,
    ruby,
    textile,
};
const languageLabel = {
    textile: 'Plain Text',
    c: 'C',
    cpp: 'C++',
    java: 'Java',
    python: 'Python',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    css: 'CSS',
    ruby: 'Ruby',
};
// languageSupport.forEach(item => {
//     // const requireDFile = `@codemirror/legacy-modes/mode/${item.mode}`;
//     // const languageData = (await import(`@codemirror/legacy-modes/mode/${item.mode}`))[item.language];
//     // const languageData = require(`@codemirror/legacy-modes/mode/${item.mode}`)[item.language];
//     // const languageData = require(requireDFile)[item.language];
//     languageConfigs[item.language] = languageData;
// });
const getStreamLanguage = lang => {
    let streamLanguage = languageConfigs[lang];
    if (streamLanguage) {
        return { streamLanguage: streamLanguage, label: languageLabel[lang] };
    } else {
        return { streamLanguage: languageConfigs[defaulLanguage], label: languageLabel[defaulLanguage] };
    }
};
export { getStreamLanguage, languageSupport, languageLabel };
