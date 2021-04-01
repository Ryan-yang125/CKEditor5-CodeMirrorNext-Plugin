import Command from '../../ckeditor5-core/src/command';
export default class CodeBlockCommand extends Command {
    execute(language) {
        const model = this.editor.model;
        model.change(writer => {
            const codeMirror = writer.createElement('codeMirror', { language: language || 'textile' });
            model.insertContent(codeMirror);
            writer.setSelection(codeMirror, 'in');
        });
    }
    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;

        this.isEnabled = selection.focus.parent.name !== 'codeMirror';
    }
}
