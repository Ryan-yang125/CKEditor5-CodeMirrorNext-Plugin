import Plugin from '../../ckeditor5-core/src/plugin';
import Collection from '../../ckeditor5-utils/src/collection';
import Model from '../../toe-ui/src/model';
import SplitButtonView from '../../toe-ui/src/dropdown/button/splitbuttonview';
import { createDropdown, addListToDropdown } from '../../toe-ui/src/dropdown/utils';
import { getNormalizedAndLocalizedLanguageDefinitions } from './utils';

import codeBlockIcon from '../theme/icons/codeblock.svg';
import '../theme/codeblock.css';
/**
 * The code block UI plugin.
 *
 * Introduces the `'codeBlock'` dropdown.
 *
 * @extends module:core/plugin~Plugin
 */
export default class CodeBlockUI extends Plugin {
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const t = editor.t;
        const componentFactory = editor.ui.componentFactory;
        //{c:'C',cpp:'C++'}
        const normalizedLanguageDefs = getNormalizedAndLocalizedLanguageDefinitions(editor);
        const defaultLanguageDefinition = normalizedLanguageDefs[0];

        componentFactory.add('codeblock', locale => {
            const command = editor.commands.get('codeBlock');
            const dropdownView = createDropdown(locale, true, SplitButtonView);
            const splitButtonView = dropdownView.buttonView;

            splitButtonView.set({
                label: t('Insert code block'),
                tooltip: true,
                icon: codeBlockIcon,
                isToggleable: true,
            });

            splitButtonView.bind('isOn').to(command, 'value', value => !!value);

            splitButtonView.on('execute', () => {
                editor.execute('codeBlock', {
                    language: `textile`,
                });

                editor.editing.view.focus();
            });

            dropdownView.on('execute', evt => {
                editor.execute('codeBlock', evt.source._codeBlockLanguage);

                editor.editing.view.focus();
            });

            dropdownView.class = 'toe-code-block-dropdown';
            dropdownView.bind('isEnabled').to(command);

            addListToDropdown(dropdownView, this._getLanguageListItemDefinitions(normalizedLanguageDefs));

            return dropdownView;
        });
    }

    /**
     * A helper returning a collection of the `codeBlock` dropdown items representing languages
     * available for the user to choose from.
     *
     * @private
     * @param {Array.<module:code-block/codeblock~CodeBlockLanguageDefinition>} normalizedLanguageDefs
     * @returns {Iterable.<module:ui/dropdown/utils~ListDropdownItemDefinition>}
     */
    _getLanguageListItemDefinitions(normalizedLanguageDefs) {
        const editor = this.editor;
        const command = editor.commands.get('codeBlock');
        const itemDefinitions = new Collection();

        for (const languageDef of normalizedLanguageDefs) {
            const definition = {
                type: 'button',
                model: new Model({
                    _codeBlockLanguage: languageDef.language,
                    label: languageDef.label,
                    withText: true,
                }),
            };

            definition.model.bind('isOn').to(command, 'value', value => {
                return value === definition.model._codeBlockLanguage;
            });

            itemDefinitions.add(definition);
        }

        return itemDefinitions;
    }
}
