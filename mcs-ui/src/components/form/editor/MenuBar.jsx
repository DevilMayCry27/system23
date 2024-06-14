import "./Tiptap.scss";
import RedoOutlined from "@ant-design/icons/RedoOutlined";
import UndoOutlined from "@ant-design/icons/UndoOutlined";
import BoldOutlined from "@ant-design/icons/BoldOutlined";
import ItalicOutlined from "@ant-design/icons/ItalicOutlined";
import StrikethroughOutlined from "@ant-design/icons/StrikethroughOutlined";
import CodeOutlined from "@ant-design/icons/CodeOutlined";
import ClearOutlined from "@ant-design/icons/ClearOutlined";
import UnorderedListOutlined from "@ant-design/icons/UnorderedListOutlined";
import OrderedListOutlined from "@ant-design/icons/OrderedListOutlined";
import AlignCenterOutlined from "@ant-design/icons/AlignCenterOutlined";
import AlignLeftOutlined from "@ant-design/icons/AlignLeftOutlined";
import AlignRightOutlined from "@ant-design/icons/AlignRightOutlined";

import { Button, Tooltip } from "antd/lib";

const MenuBar = ({ editor }) => {
  // const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="menubar">
      <Tooltip title="align left">
        <Button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          type={editor.isActive({ textAlign: "left" }) ? "primary" : ""}
          size="small"
          icon={<AlignLeftOutlined />}
        />
      </Tooltip>

      <Tooltip title="align center">
        <Button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          type={editor.isActive({ textAlign: "center" }) ? "primary" : ""}
          size="small"
          icon={<AlignCenterOutlined />}
        />
      </Tooltip>
      <Tooltip title="align center">
        <Button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          type={editor.isActive({ textAlign: "right" }) ? "primary" : ""}
          size="small"
          icon={<AlignRightOutlined />}
        />
      </Tooltip>

      <Tooltip title="bold">
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          type={editor.isActive("bold") ? "primary" : ""}
          size="small"
          icon={<BoldOutlined />}
        />
      </Tooltip>
      <Tooltip title="italic">
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          type={editor.isActive("italic") ? "primary" : ""}
          size="small"
          icon={<ItalicOutlined />}
        />
      </Tooltip>
      <Tooltip title="strike">
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          type={editor.isActive("strike") ? "primary" : ""}
          size="small"
          icon={<StrikethroughOutlined />}
        />
      </Tooltip>
      <Tooltip title="code">
        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          type={editor.isActive("code") ? "primary" : ""}
          size="small"
          icon={<CodeOutlined />}
        />
      </Tooltip>
      <Tooltip title="clear marks">
        <Button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          size="small"
          icon={<ClearOutlined />}
        />
      </Tooltip>
      <Tooltip title="clear nodes">
        <Button
          onClick={() => editor.chain().focus().clearNodes().run()}
          size="small"
          icon={<ClearOutlined />}
        />
      </Tooltip>

      <Tooltip title="paragraph">
        <Button
          onClick={() => editor.chain().focus().setParagraph().run()}
          type={editor.isActive("paragraph") ? "primary" : ""}
          size="small"
          icon={"P"}
        />
      </Tooltip>

      {/* <Tooltip title="heading 1">
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          type={editor.isActive("heading", { level: 1 }) ? "primary" : ""}
          size="small"
          icon={"H1"}
        />
      </Tooltip>
      */}
      <Tooltip title="heading 2">
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          type={editor.isActive("heading", { level: 2 }) ? "primary" : ""}
          size="small"
          icon={"H2"}
        />
      </Tooltip>

      <Tooltip title="heading 3">
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          type={editor.isActive("heading", { level: 3 }) ? "primary" : ""}
          size="small"
          icon={"H3"}
        />
      </Tooltip>

      <Tooltip title="heading 4">
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          type={editor.isActive("heading", { level: 4 }) ? "primary" : ""}
          size="small"
          icon={"H4"}
        />
      </Tooltip>

      <Tooltip title="heading 5">
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          type={editor.isActive("heading", { level: 5 }) ? "primary" : ""}
          size="small"
          icon={"H5"}
        />
      </Tooltip>

      <Tooltip title="heading 6">
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          type={editor.isActive("heading", { level: 6 }) ? "primary" : ""}
          size="small"
          icon={"H6"}
        />
      </Tooltip>
      <Tooltip title="bullet list">
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          type={editor.isActive("bulletList", { level: 6 }) ? "primary" : ""}
          size="small"
          icon={<UnorderedListOutlined />}
        />
      </Tooltip>
      <Tooltip title="unordered list">
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          type={editor.isActive("orderedList") ? "primary" : ""}
          size="small"
          icon={<OrderedListOutlined />}
        />
      </Tooltip>
      <Tooltip title="code block">
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          type={editor.isActive("codeBlock") ? "primary" : ""}
          size="small"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-code"
              viewBox="0 0 16 16"
            >
              <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8z" />
            </svg>
          }
        />
      </Tooltip>

      <Tooltip title="block qoute">
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          type={editor.isActive("blockquote") ? "primary" : ""}
          size="small"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-blockquote-left"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1zm5 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1zm.79-5.373q.168-.117.444-.275L3.524 6q-.183.111-.452.287-.27.176-.51.428a2.4 2.4 0 0 0-.398.562Q2 7.587 2 7.969q0 .54.217.873.217.328.72.328.322 0 .504-.211a.7.7 0 0 0 .188-.463q0-.345-.211-.521-.205-.182-.568-.182h-.282q.036-.305.123-.498a1.4 1.4 0 0 1 .252-.37 2 2 0 0 1 .346-.298zm2.167 0q.17-.117.445-.275L5.692 6q-.183.111-.452.287-.27.176-.51.428a2.4 2.4 0 0 0-.398.562q-.165.31-.164.692 0 .54.217.873.217.328.72.328.322 0 .504-.211a.7.7 0 0 0 .188-.463q0-.345-.211-.521-.205-.182-.568-.182h-.282a1.8 1.8 0 0 1 .118-.492q.087-.194.257-.375a2 2 0 0 1 .346-.3z" />
            </svg>
          }
        />
      </Tooltip>

      <Tooltip title="horizontal rule">
        <Button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          size="small"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-hr"
              viewBox="0 0 16 16"
            >
              <path d="M12 3H4a1 1 0 0 0-1 1v2.5H2V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2.5h-1V4a1 1 0 0 0-1-1M2 9.5h1V12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9.5h1V12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm-1.5-2a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1z" />
            </svg>
          }
        />
      </Tooltip>

      <Tooltip title="hardbreak">
        <Button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          size="small"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-return-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"
              />
            </svg>
          }
        />
      </Tooltip>
      <Tooltip title="undo">
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          size="small"
          icon={<UndoOutlined />}
        />
      </Tooltip>
      <Tooltip title="redo">
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          size="small"
          icon={<RedoOutlined />}
        />
      </Tooltip>
    </div>
  );
};

export default MenuBar;
