// Hooks
import { useEditor, EditorContent } from "@tiptap/react";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
// Utils
import StarterKit from "@tiptap/starter-kit";
// Components
import { Bold, Italic, List, ListOrdered, X } from "lucide-react";
import { Button } from "../ui/button";
// Types
import type { IStickyNote } from "../../interfaces";

interface NoteEditorProps {
  note: IStickyNote;
  onUpdate: (id: string, newContent: IStickyNote["content"]) => void;
  onDelete: (id: string) => void;
}

export const NoteEditor = ({ note, onUpdate, onDelete }: NoteEditorProps) => {
  const [content, setContent] = useState(note.content);

  const [debouncedContent] = useDebounce(content, 1000);

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getJSON());
    },
  });

  useEffect(() => {
    if (JSON.stringify(debouncedContent) !== JSON.stringify(note.content)) {
      onUpdate(note.id, debouncedContent);
    }
  }, [debouncedContent, note.id, note.content, onUpdate]);

  if (!editor) {
    return null;
  }

  const MenuBar = () => (
    <div className="flex items-center gap-1 mb-1 rounded-md sticky bg-zinc-800/50 p-1">
      <Button
        type="button"
        size={"icon"}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`toolbar-button ${
          editor.isActive("bold") ? "is-active" : ""
        }`}
      >
        <Bold size={16} />
      </Button>

      <Button
        type="button"
        size={"icon"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`toolbar-button ${
          editor.isActive("italic") ? "is-active" : ""
        }`}
      >
        <Italic size={16} />
      </Button>

      <Button
        type="button"
        size={"icon"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`toolbar-button ${
          editor.isActive("bulletList") ? "is-active" : ""
        }`}
      >
        <List size={16} />
      </Button>

      <Button
        type="button"
        size={"icon"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`toolbar-button ${
          editor.isActive("orderedList") ? "is-active" : ""
        }`}
      >
        <ListOrdered size={16} />
      </Button>
    </div>
  );

  return (
    <div className="relative p-2 border border-zinc-700/50 rounded-xl bg-zinc-950/20 backdrop-blur-lg">
      <button
        onClick={() => onDelete(note.id)}
        className="absolute top-2 right-2 p-0.5 rounded-full text-zinc-500 hover:text-red-500 transition-colors z-10"
      >
        <X size={20} />
      </button>

      <EditorContent editor={editor} />
      <MenuBar />
    </div>
  );
};
