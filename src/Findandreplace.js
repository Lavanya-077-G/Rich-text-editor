import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FindAndReplaceEditor = ({textEditorRef: quillRef}) => {
  const [searchText, setSearchText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [selection, setSelection] = useState(null);
 
  const handleSearch = () => {
    const quill = quillRef.current.getEditor();
    const text = quill.getText();

    const index = text.indexOf(searchText);
    if (index !== -1) {
      const length = searchText.length;
      quill.setSelection(index, length);
      setSelection({ index, length });
    } else {
      alert('Text not found');
      setSelection(null);
    }
  };

  const handleReplace = () => {
    const quill = quillRef.current.getEditor();
    console.log(replaceText)

    if (selection) {
      const { index, length } = selection;
      console.log(selection)
      quill.deleteText(index, length);
      quill.insertText(index, replaceText);
    }
  };

  return (
    <div>
      <div>
        <label>Search Text:</label>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <label>Replace Text:</label>
        <input
          type="text"
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
        />
        <button onClick={handleReplace}>Replace</button>
      </div>
    </div>
  );
};

export default FindAndReplaceEditor;