const EditorJSONPreview = ({ content }) => {
  return (
    <div
      className="tiptap"
      dangerouslySetInnerHTML={{
        // __html: window.localStorage.getItem("editor-content"),
        __html: content,
      }}
    ></div>
  );
};

export default EditorJSONPreview;
