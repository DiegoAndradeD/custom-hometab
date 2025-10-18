import type { IBookmark } from "../../interfaces";
import { Card, CardContent, CardHeader } from "../ui/card";

interface BookmarkCardProps {
  bookmark: IBookmark;
}

const BookmarkCard = ({ bookmark }: BookmarkCardProps) => {
  const domain = new URL(bookmark.url).hostname;
  const favicon = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;

  return (
    <Card
      onClick={() => window.open(bookmark.url, "_blank")}
      className="bg-transparent border-none shadow-none flex flex-col !gap-2 p-0 cursor-pointer m-0 max-w-24"
    >
      <CardHeader className="flex items-center justify-center p-0">
        <div className="w-12 h-12 rounded-full bg-icon-background flex items-center justify-center">
          <img
            src={favicon}
            alt={bookmark.title}
            className="w-7 h-7 object-contain"
          />
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-center w-20 !p-0">
        <p className="text-center text-sm text-foreground/80">
          {bookmark.title}
        </p>
      </CardContent>
    </Card>
  );
};
export default BookmarkCard;
