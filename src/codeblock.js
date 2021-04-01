import Plugin from '../../ckeditor5-core/src/plugin';
import Widget from '../../ckeditor5-widget/src/widget';
import CodeBlockEditing from './codeblockediting';
import CodeBlockUI from './codeblockui';
export default class CodeBlock extends Plugin {
    static get requires() {
        return [CodeBlockEditing, CodeBlockUI, Widget];
    }
}
