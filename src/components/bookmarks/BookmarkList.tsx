import { CirclePlus } from "lucide-react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import BookmarkCard from "./BookmarkCard";
import useModalStore, { LayoutModal } from "../../stores/modal.store";
import useWidgetsStore from "../../stores/widgets.store";

const BookmarkList = () => {
  const { toggleModal } = useModalStore();
  const { bookmarksWidget } = useWidgetsStore();

  return (
    <ScrollArea className="w-[750px] rounded-md border-none whitespace-nowrap">
      <div className="flex w-max items-center gap-6 p-4">
        {bookmarksWidget.items.length > 0 &&
          bookmarksWidget.items.map((bookmark) => (
            <BookmarkCard key={bookmark.url} bookmark={bookmark} />
          ))}
        <Card
          onClick={() => {
            toggleModal(LayoutModal.CreateBookmark);
          }}
          className="bg-transparent border-none shadow-none flex flex-col !gap-2 p-0 cursor-pointer m-0 max-w-24"
        >
          <CardHeader className="flex items-center justify-center p-0">
            <div className="w-12 h-12 rounded-full bg-icon-background flex items-center justify-center">
              <CirclePlus className="w-7 h-7 object-contain" />
            </div>
          </CardHeader>

          <CardContent className="flex items-center justify-center w-20 !p-0">
            <p className="text-center text-sm text-foreground/80">
              Add bookmark
            </p>
          </CardContent>
        </Card>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default BookmarkList;
