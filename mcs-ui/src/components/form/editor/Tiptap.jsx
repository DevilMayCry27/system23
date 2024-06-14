import "./Tiptap.scss";

import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";

const extensions = [
  TextStyle.configure({ types: [ListItem.name] }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const Tiptap = ({ value, onChange, bordered = false }) => {
  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML() === "<p></p>" ? "" : editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `${bordered ? "bordered": "borderless"}`,
      },
    },
    injectCSS: true,
  });

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );

  // return (
  //   <EditorProvider
  //     slotBefore={<MenuBar />}
  //     extensions={extensions}
  //     content={value}
  //     onUpdate={({ editor }) => {
  //       onChange(editor.getHTML() === "<p></p>" ? "" : editor.getHTML());
  //       // window.localStorage.setItem("editor-content", editor.getHTML());
  //     }}
  //     editorProps={{
  //       attributes: {
  //         class: `${bordered && "bordered"}`,
  //       },
  //     }}
  //   ></EditorProvider>
  // );
};

export default Tiptap;
