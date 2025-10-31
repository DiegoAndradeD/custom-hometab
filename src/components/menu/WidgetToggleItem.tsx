// Components
import { Check } from "lucide-react";
import { MenubarItem } from "../ui/menubar";
// Stores
import useWidgetsStore, { type WidgetKeys } from "../../stores/widgets.store";

interface WidgetToggleItemProps {
  label: string;
  widgetKey: WidgetKeys;
  toggleProperty: string;
  isActive: boolean;
}

const WidgetToggleItem = ({
  label,
  widgetKey,
  toggleProperty,
  isActive,
}: WidgetToggleItemProps) => {
  const { updateWidget } = useWidgetsStore();

  const handleToggle = () => {
    updateWidget(widgetKey, { [toggleProperty]: !isActive } as any);
  };

  return (
    <MenubarItem onClick={handleToggle}>
      <div className="flex items-center justify-between w-full">
        {label}
        {isActive && <Check width={16} height={16} />}
      </div>
    </MenubarItem>
  );
};

export default WidgetToggleItem;
