import Command from '../../ckeditor5-core/src/command';
import first from '../../ckeditor5-utils/src/first';

export default class CodeBlockCommand extends Command {
    execute(language='textile', code = '') {
        const model = this.editor.model;
        const schema = model.schema;
        const selection = model.document.selection;
        
        let selectedTextAr = [];
        const range = selection.getFirstRange();
        for (const item of range.getItems()) {
            if(item.data) {
                selectedTextAr.push(item.data);
            }
        }
        const selectedText = selectedTextAr.join('\n');
        if(!code && selectedText) {
            code = selectedText;
        }
        model.change(writer => {
            const codeMirror = writer.createElement('codeMirror', {
                language,
                'source-code': code,
            });
            model.insertContent(codeMirror);
            writer.setSelection(codeMirror, 'in');
        });
    }
    refresh() {
        this.value = this._getValue();
		this.isEnabled = this._checkEnabled();
    }
    _getValue() {
		const selection = this.editor.model.document.selection;
		const firstBlock = first( selection.getSelectedBlocks() );
		const isCodeBlock = !!( firstBlock && firstBlock.is( 'element', 'codeMirror' ) );

		return isCodeBlock ? firstBlock.getAttribute( 'language' ) : false;
	
    }
    _checkEnabled() {
		if ( this.value ) {
			return true;
		}

		const selection = this.editor.model.document.selection;
		const schema = this.editor.model.schema;

		const firstBlock = first( selection.getSelectedBlocks() );

		if ( !firstBlock ) {
			return false;
		}

		return canBeCodeBlock( schema, firstBlock );
    }
}
function canBeCodeBlock( schema, element ) {
	if ( element.is( 'rootElement' ) || schema.isLimit( element ) ) {
		return false;
	}

	return schema.checkChild( element.parent, 'codeMirror' );
}