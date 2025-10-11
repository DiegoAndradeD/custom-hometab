import { Check } from "lucide-react";
import { MenubarItem, MenubarSeparator } from "../ui/menubar";

export interface ISubmenuItem {
  name: string;
  onClick: () => void;
  isActive?: boolean;
}

interface ISubmenuListProps {
  title?: string;
  items: ISubmenuItem[];
}

const SubmenuList = ({ title, items }: ISubmenuListProps) => {
  return (
    <div>
      {title && (
        <>
          <MenubarItem className="hover:!bg-transparent">{title}</MenubarItem>
          <MenubarSeparator />
        </>
      )}

      {items.map((item) => (
        <div
          key={item.name}
          className="flex items-center gap-1 cursor-pointer hover:bg-accent px-2 rounded-sm"
        >
          <MenubarItem
            className="hover:!bg-transparent cursor-pointer w-full"
            onClick={item.onClick}
          >
            {item.name}
          </MenubarItem>
          {item.isActive && <Check width={16} height={16} />}
        </div>
      ))}
    </div>
  );
};
export default SubmenuList;
