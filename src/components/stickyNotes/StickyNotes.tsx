// Components
import { Notebook, Plus } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { NoteEditor } from "./NoteEditor";
import { ButtonGroup } from "../ui/button-group";
// Utils
import { v4 as uuidv4 } from "uuid";
// Stores
import useWidgetsStore from "../../stores/widgets.store";
// Types
import type { IStickyNote } from "../../interfaces";
import type { JSONContent } from "@tiptap/react";

const StickyNotes = () => {
  const { stickyNotesWidget, updateWidget } = useWidgetsStore();
  const { notes } = stickyNotesWidget;

  const handleAddNote = () => {
    const newNote: IStickyNote = {
      id: uuidv4(),
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "" }],
          },
        ],
      },
    };

    updateWidget("stickyNotesWidget", {
      notes: [...notes, newNote],
    });
  };

  const handleUpdateNote = (id: string, newContent: JSONContent) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content: newContent } : note
    );
    updateWidget("stickyNotesWidget", { notes: updatedNotes });
  };

  const handleDeleteNote = (id: string) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    updateWidget("stickyNotesWidget", { notes: filteredNotes });
  };

  return (
    <HoverCard openDelay={10} closeDelay={10}>
      <HoverCardTrigger
        className="bg-background px-4 py-1 rounded-2xl text-sm !h-7 !min-h-7 !max-h-7 flex items-center
      justify-center text-foreground"
      >
        <Notebook size={16} />
      </HoverCardTrigger>

      <HoverCardContent
        className="!w-96 border border-zinc-700/50 rounded-xl"
        side="top"
      >
        <Card className="border-0 p-0 bg-transparent !shadow-none">
          <CardHeader className="p-0 mb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold">Sticky Notes</CardTitle>
          </CardHeader>
          {notes.length > 0 && (
            <CardContent className="p-0 max-h-96 overflow-y-auto space-y-2 bg-transparent">
              {notes.map((note) => (
                <NoteEditor
                  key={note.id}
                  note={note}
                  onUpdate={handleUpdateNote}
                  onDelete={handleDeleteNote}
                />
              ))}
            </CardContent>
          )}

          <CardFooter className="p-0 border-none">
            <ButtonGroup aria-label="notes-actions-buttons">
              <Button
                size="icon"
                variant="outline"
                onClick={handleAddNote}
                effect={"shineHover"}
              >
                <Plus size={18} />
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </HoverCardContent>
    </HoverCard>
  );
};
export default StickyNotes;
