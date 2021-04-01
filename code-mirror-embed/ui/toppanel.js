import LangSelector from './langselector';
import LineWrappingSwitcher from './linewrappingswitcher';
const defaultProps = {
    style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
};
export default ({ language, onLangChange, onLineWrappingChange }) => {
    return (
        <div {...defaultProps}>
            <LangSelector language={language} onLangChange={onLangChange} />
            <LineWrappingSwitcher onLineWrappingChange={onLineWrappingChange} />
        </div>
    );
};
