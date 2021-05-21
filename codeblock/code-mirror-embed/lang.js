import { c, cpp, java, csharp} from '@codemirror/legacy-modes/mode/clike';
import { python } from '@codemirror/legacy-modes/mode/python';
import { javascript, typescript, json } from '@codemirror/legacy-modes/mode/javascript';
import { ruby } from '@codemirror/legacy-modes/mode/ruby';
import { rust } from '@codemirror/legacy-modes/mode/rust';
import { textile } from '@codemirror/legacy-modes/mode/textile';
import { css } from '@codemirror/legacy-modes/mode/css';
import { go } from '@codemirror/legacy-modes/mode/go';
import { haskell } from '@codemirror/legacy-modes/mode/haskell';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import { standardSQL } from '@codemirror/legacy-modes/mode/sql';
import { html } from '@codemirror/legacy-modes/mode/xml';

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
        language: 'rust',
        label: 'Rust',
        mode: rust,
    },
    {
        language: 'typescript',
        label: 'TypeScript',
        mode: typescript,
    },
    {
        language: 'json',
        label: 'JSON',
        mode: json,
    },
    {
        language: 'go',
        label: 'Go',
        mode: go,
    },
    {
        language: 'haskell',
        label: 'Haskell',
        mode: haskell,
    },
    {
        language: 'shell',
        label: 'Shell',
        mode: shell,
    },
    {
        language: 'standardSQL',
        label: 'SQL',
        mode: standardSQL,
    },
    {
        language: 'html',
        label: 'HTML',
        mode: html,
    }
];

languageSupport.sort((a,b) => {
    if (a.language === 'textile' || b.language === 'textile') {
        return 1;
    }
    if (a.language < b.language) {
        return -1;
    }
    if (a.language > b.language){
        return 1;
    }
    return 0;
});

const languageConfigs = {
    c,
    cpp,
    java,
    python,
    javascript,
    typescript,
    css,
    ruby,
    rust,
    textile,
    json,
    go,
    haskell,
    html,
    standardSQL
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
    rust: 'Rust',
    json:'JSON',
    go:'Go',
    haskell:'Haskell',
    html:'HTML',
    standardSQL:'SQL'
};
const getStreamLanguage = lang => {
    let streamLanguage = languageConfigs[lang];
    if (streamLanguage) {
        return { streamLanguage: streamLanguage, label: languageLabel[lang] };
    } else {
        return { streamLanguage: languageConfigs[defaulLanguage], label: languageLabel[defaulLanguage] };
    }
};
export { getStreamLanguage, languageSupport, languageLabel };
