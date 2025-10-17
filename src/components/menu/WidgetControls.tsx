// Components
import { Check } from "lucide-react";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar";
// Stores
import useWidgetsStore from "../../stores/widgets.store";
// Data
import { INPUT_VARIANT_OPTIONS } from "../ui/input";

const WidgetControls = () => {
  const {
    searchBarWidget,
    setSearchBarWidget,
    dateAndTimeWidget,
    setDateAndTimeWidget,
  } = useWidgetsStore();

  const handleToggleSearchBar = () => {
    setSearchBarWidget({
      isSearchBarActive: !searchBarWidget.isSearchBarActive,
    });
  };

  const handleToggleDateAndTime = () => {
    setDateAndTimeWidget({
      isDateAndTimeActive: !dateAndTimeWidget.isDateAndTimeActive,
    });
  };

  const handleSearchBarVariantChange = (
    variant: (typeof INPUT_VARIANT_OPTIONS)[number]
  ) => {
    setSearchBarWidget({ variant });
  };

  return (
    <MenubarMenu>
      <MenubarTrigger className="text-foreground !cursor-pointer">
        WIDGETS
      </MenubarTrigger>
      <MenubarContent>
        <MenubarSub>
          <MenubarSubTrigger>Search Bar</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem onClick={handleToggleSearchBar}>
              <div className="flex items-center justify-between w-full">
                Search Bar
                {searchBarWidget.isSearchBarActive && (
                  <Check width={16} height={16} />
                )}
              </div>
            </MenubarItem>
            <MenubarSeparator />
            {INPUT_VARIANT_OPTIONS.map((variant) => (
              <MenubarItem
                key={variant}
                onClick={() => handleSearchBarVariantChange(variant)}
              >
                <div className="flex items-center justify-between w-full">
                  {variant}
                  {searchBarWidget.variant === variant && (
                    <Check width={16} height={16} />
                  )}
                </div>
              </MenubarItem>
            ))}
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarItem onClick={handleToggleDateAndTime}>
          <div className="flex items-center justify-between w-full">
            Toggle clock
            {dateAndTimeWidget.isDateAndTimeActive && (
              <Check width={16} height={16} />
            )}
          </div>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};

export default WidgetControls;
