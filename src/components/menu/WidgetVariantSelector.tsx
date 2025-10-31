// Components
import { Check } from "lucide-react";
import { MenubarItem } from "../ui/menubar";
// Stores
import useWidgetsStore, { type WidgetKeys } from "../../stores/widgets.store";

type ValidOptionType = string | { label: string; value: any };

interface WidgetVariantSelectorProps {
  widgetKey: WidgetKeys;
  currentVariant: any;
  options: (ValidOptionType | null | undefined)[];
}

const WidgetVariantSelector = ({
  widgetKey,
  currentVariant,
  options,
}: WidgetVariantSelectorProps) => {
  const { updateWidget } = useWidgetsStore();

  const handleVariantChange = (newValue: any) => {
    updateWidget(widgetKey, { variant: newValue });
  };

  if (!options || options.length === 0) return null;

  return (
    <>
      {options.map((option, index) => {
        if (option === null || option === undefined) {
          return null;
        }

        const isStringOption = typeof option === "string";
        const key = isStringOption ? option : (option as any).value ?? index;
        const label = isStringOption ? option : (option as any).label;
        const value = isStringOption ? option : (option as any).value;

        return (
          <MenubarItem key={key} onClick={() => handleVariantChange(value)}>
            <div className="flex items-center justify-between w-full">
              {label}
              {currentVariant === value && <Check width={16} height={16} />}
            </div>
          </MenubarItem>
        );
      })}
    </>
  );
};

export default WidgetVariantSelector;
