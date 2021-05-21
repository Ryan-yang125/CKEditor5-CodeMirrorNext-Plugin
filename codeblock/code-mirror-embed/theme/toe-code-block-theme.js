import { EditorView } from '@codemirror/view';
import { HighlightStyle, tags as t } from '@codemirror/highlight';

const chalky = '#e5c07b',
    coral = '#e06c75',
    cyan = '#56b6c2',
    invalid = '#ffffff',
    ivory = '#abb2bf',
    stone = '#7d8799', // Brightened compared to original to increase contrast
    malibu = '#61afef',
    sage = '#98c379',
    whiskey = '#d19a66',
    violet = '#c678dd',
    background = '#f5f6f7';

// The editor theme styles for TOE.
const ToeTheme = EditorView.theme({
    '&': {
        backgroundColor: background,
        border: '1px solid #dee0e3',
        outline: 'none',
    },

    '.cm-scroller': {
    },

    '.cm-content': {
        padding:"12px 0px 10px 10px",
        fontFamily: 'monospace',
    },
    '&.cm-focused': {
        outline: 'none',
    },

    // '.cm-line': {
    //     paddingLeft: '4px',
    //     paddingRight: '4px',
    // },

    '.cm-activeLine': { backgroundColor: background },

    '.cm-gutters': {
        backgroundColor: background,
        color: stone,
        border: 'none',
        paddingLeft: '16px',
    },
});

/// The highlighting style for TOE.
const ToeHighlightStyle = HighlightStyle.define([
    { tag: t.keyword, color: violet },
    { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: coral },
    { tag: [t.function(t.variableName), t.labelName], color: malibu },
    { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: whiskey },
    { tag: [t.definition(t.name), t.separator], color: ivory },
    {
        tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
        color: chalky,
    },
    { tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)], color: cyan },
    { tag: [t.meta, t.comment], color: stone },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.link, color: stone, textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: coral },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: whiskey },
    { tag: [t.processingInstruction, t.string, t.inserted], color: sage },
    { tag: t.invalid, color: invalid },
]);
export { ToeTheme, ToeHighlightStyle };
