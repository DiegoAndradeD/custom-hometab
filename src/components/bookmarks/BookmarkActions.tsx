// Components
import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
// Hooks
import { useState } from "react";

interface BookmarkActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const BookmarkActions = ({ onEdit, onDelete }: BookmarkActionsProps) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    setIsTooltipOpen(false); // Fecha antes de desmontar
    setTimeout(() => {
      action();
    }, 0); // Garante que o tooltip feche antes de remover o card
  };

  return (
    <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
      <TooltipTrigger
        asChild
        onClick={(e) => {
          e.stopPropagation();
          setIsTooltipOpen((prev) => !prev);
        }}
        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity !bg-transparent rounded-full hover:!bg-accent/40 p-1"
      >
        <Button variant="ghost" size="icon">
          <EllipsisVertical
            width={20}
            height={20}
            className="text-foreground"
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={10} className="bg-background p-0">
        <ButtonGroup orientation="vertical" className="h-fit text-foreground">
          <Button
            onClick={(e) => handleActionClick(e, onEdit)}
            variant="ghost"
            className="!text-sm"
          >
            Edit bookmark
          </Button>
          <Button
            onClick={(e) => handleActionClick(e, onDelete)}
            variant="ghost"
            className="!text-sm"
          >
            Delete
          </Button>
        </ButtonGroup>
      </TooltipContent>
    </Tooltip>
  );
};

export default BookmarkActions;
