import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import type { IBookmark } from "../../interfaces";
import { Validators } from "../../utils";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ButtonGroup } from "../ui/button-group";

interface BookmarkCardProps {
  bookmark: IBookmark;
}

const BookmarkCard = ({ bookmark }: BookmarkCardProps) => {
  const domain = Validators.isValidUrl(bookmark.url)
    ? new URL(bookmark.url).hostname
    : undefined;
  const favicon = domain
    ? `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
    : "https://www.google.com/s2/favicons?sz=64&domain=example.com";

  return (
    <Card
      onClick={() => window.open(bookmark.url, "_blank")}
      className="bg-transparent border-none shadow-none flex flex-col !gap-2 p-4 cursor-pointer m-0 max-w-24 hover:bg-accent/20
      rounded-sm group min-w-28 min-h-40"
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

      <CardContent className="flex items-center justify-center !p-0">
        <p className="text-center text-sm text-foreground/80">
          {bookmark.title}
        </p>
      </CardContent>
      <CardFooter className="flex opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all items-center justify-center">
        <ButtonGroup className="text-sm">
          <Button size={"icon"} variant={"ghost"}>
            <Trash />
          </Button>
          <Button size={"icon"} variant={"ghost"}>
            <Pencil />
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
export default BookmarkCard;
