import { Component, useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import QuillBetterTable from 'quill-better-table';
import quillEmoji from 'quill-emoji';
import "quill-emoji/dist/quill-emoji.css";
import 'quill-paste-smart';
import QuillCursors from 'quill-cursors';
import 'quill-focus';
import FindAndReplaceEditor from './Findandreplace';

const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;

var Focus = require('quill-focus');
Quill.register('modules/focus', Focus)
Quill.register({
  'formats/emoji': EmojiBlot,
  'modules/emoji-shortname': ShortNameEmoji,
  'modules/emoji-toolbar': ToolbarEmoji,
  'modules/emoji-textarea': TextAreaEmoji
}, true);
// Quill.register({
//     'modules/better-table': QuillBetterTable.default,
//   }, true)
Quill.register('modules/cursors', QuillCursors);
const Texteditor = () => {
    const [text,setText] = useState("");
    const textEditorRef = useRef(null);

 const modules = {
    toolbar: [
      [{ 'font': [] }, { 'header': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['emoji'],
      ['link', 'image'],
      ['clean']
    ],
    'emoji-toolbar': true,
    "emoji-shortname": true,
    clipboard: {
        allowed: {
            tags: ['a', 'b', 'strong', 'u', 's', 'i', 'p', 'br', 'ul', 'ol', 'li', 'span'],
            attributes: ['href', 'rel', 'target', 'class']
        },
        keepSelection: true,
        substituteBlockElements: true,
        magicPasteLinks: true,
        hooks: {
            uponSanitizeElement(node, data, config) {
                console.log(node);
            },
        },
    },
    focus: {
        focusClass: 'focused-blot'
    },
    cursors: {
        template: '<div class="custom-cursor">...</div>',
        hideDelayMs: 5000,
        hideSpeedMs: 0,
        selectionChangeSource: null,
        transformOnTextChange: true,
      },
    // table: false,  // disable table module
    // 'better-table': {
    //     operationMenu: {
    //       items: {
    //         unmergeCells: {
    //           text: 'Another unmerge cells name'
    //         }
    //       }
    //     }
    //   },
  }

 const formats = ['font', 'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'color', 'background', 'list', 'indent', 'align', 'link', 'image', 'clean', 'emoji']

 const handleInsertTable = (e) =>{
      e.stopPropagation();
  const editor = textEditorRef.current.getEditor();
  editor.getModule('better-table').insertTable(3, 3);
}

    return (
      <div className="text-editor">
        <button onClick={handleInsertTable}>InsertTable</button>
        <ReactQuill
          ref = {textEditorRef}
          theme="snow"
          modules={modules}
          formats={formats}
        />
        <FindAndReplaceEditor textEditorRef={textEditorRef}/>
        {/* <InsertTable/> */}
      </div>
    );
}
export default Texteditor;