// Hooks
import { useCallback } from "react";
// Components
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "../ui/card";
import BookmarkActions from "./BookmarkActions";
// Types
import type { IBookmark } from "../../interfaces";
// Stores
import useModalStore, { LayoutModal } from "../../stores/modal.store";
import useWidgetsStore from "../../stores/widgets.store";
// Utils
import { Validators } from "../../utils";

interface BookmarkCardProps {
  bookmark: IBookmark;
}

const FAVICON_BASE_URL = "https://www.google.com/s2/favicons?sz=64&domain=";
const DEFAULT_DOMAIN = "example.com";

const BookmarkCard = ({ bookmark }: BookmarkCardProps) => {
  const { toggleModal } = useModalStore();
  const { updateWidget, bookmarksWidget } = useWidgetsStore();

  const getFaviconUrl = (url: string): string => {
    if (!Validators.isValidUrl(url)) {
      return `${FAVICON_BASE_URL}${DEFAULT_DOMAIN}`;
    }
    const domain = new URL(url).hostname;
    return `${FAVICON_BASE_URL}${domain}`;
  };

  const handleEdit = useCallback(() => {
    updateWidget("bookmarksWidget", { selectedBookmark: bookmark });
    toggleModal(LayoutModal.UpsertBookmark);
  }, [bookmark, updateWidget, toggleModal]);

  const handleDelete = () => {
    if (!bookmarksWidget) return;

    const newItems = bookmarksWidget.items.filter(
      (item) => item.url !== bookmark.url
    );
    updateWidget("bookmarksWidget", { items: newItems });

    toast.success("Bookmark deleted", {
      action: {
        label: "Undo",
        onClick: () => {
          updateWidget("bookmarksWidget", {
            items: [...newItems, bookmark],
          });
        },
      },
    });
  };
  const handleCardClick = () => {
    window.open(bookmark.url, "_blank");
  };

  return (
    <Card
      onClick={handleCardClick}
      className="bg-transparent border-none shadow-none flex flex-col !gap-2 py-4 cursor-pointer m-0 max-w-24 hover:bg-accent/20 rounded-sm min-w-28 group relative"
    >
      <BookmarkActions onEdit={handleEdit} onDelete={handleDelete} />

      <CardHeader className="flex items-center justify-center p-0">
        <div className="w-12 h-12 rounded-full bg-icon-background flex items-center justify-center">
          <img
            src={getFaviconUrl(bookmark.url)}
            alt={bookmark.title}
            className="w-7 h-7 object-contain"
          />
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-center !p-0">
        <p className="text-center text-sm text-foreground/80 truncate w-full px-2">
          {bookmark.title}
        </p>
      </CardContent>
    </Card>
  );
};

export default BookmarkCard;
