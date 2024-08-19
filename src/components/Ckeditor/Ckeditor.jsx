import React from "react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Paragraph,
  Heading,
  Autosave,
  SelectAll,
  Undo,
  FontFamily,
  FontSize,
  FontColor,
  FontBackgroundColor,
  Link,
  Alignment
} from "ckeditor5";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import "ckeditor5/ckeditor5.css";
import "./Ckeditor.css"

function Ckeditor({ setProductDesc, defaultText }) {
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
          Strikethrough,
          Paragraph,
          SelectAll,
          Undo,
          FontFamily,
          FontSize,
          FontColor,
          FontBackgroundColor,
          Link,
          Alignment
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
          "strikethrough",
          "|",
          "fontfamily",
          "fontsize",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "link",
          "|",
          "alignment"
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
      data={defaultText}
      onReady={(eventInfo, editor) => {
        setProductDesc(defaultText)
      }}
      onChange={(eventInfo, editor) => {
        setProductDesc(editor.getData());
      }}
    />
  );
}

export default Ckeditor;
