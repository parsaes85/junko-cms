import React from "react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Paragraph,
  Heading,
  Autosave,
  SelectAll,
  Undo,
} from "ckeditor5";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import "ckeditor5/ckeditor5.css";

function Ckeditor() {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        plugins: [
          Autosave,
          Bold,
          Essentials,
          Heading,
          Italic,
          Paragraph,
          SelectAll,
          Undo,
        ],
        toolbar: [
          "undo",
          "redo",
          "|",
          "selectAll",
          "|",
          "heading",
          "|",
          "bold",
          "italic",
        ],
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6",
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6",
            },
          ],
        },
      }}
      data="<p>Hello from the second editor working with the context!</p>"
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor 2 is ready to use!", editor);
      }}
    />
  );
}

export default Ckeditor;
