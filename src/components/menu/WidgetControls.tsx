import { Check, Settings } from "lucide-react";
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

import useWidgetsStore, {
  widgetsStoreInitialState,
} from "../../stores/widgets.store";
import { INPUT_VARIANT_OPTIONS } from "../ui/input";

const WidgetControls = () => {
  const { searchBarWidget, dateAndTimeWidget, bookmarksWidget, updateWidget } =
    useWidgetsStore();

  const toggleWidget = <
    K extends "searchBarWidget" | "dateAndTimeWidget" | "bookmarksWidget"
  >(
    key: K,
    prop: keyof (typeof widgetsStoreInitialState)[K]
  ) => {
    updateWidget(key, {
      [prop]: !useWidgetsStore.getState()[key][prop],
    } as any);
  };

  const handleSearchBarVariantChange = (
    variant: (typeof INPUT_VARIANT_OPTIONS)[number]
  ) => {
    updateWidget("searchBarWidget", { variant });
  };

  return (
    <MenubarMenu>
      <MenubarTrigger className="text-foreground !cursor-pointer p-0">
        <Settings width={16} height={16} />
      </MenubarTrigger>
      <MenubarContent>
        <MenubarSub>
          <MenubarSubTrigger>Search Bar</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem
              onClick={() =>
                toggleWidget("searchBarWidget", "isSearchBarActive")
              }
            >
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

        <MenubarItem
          onClick={() =>
            toggleWidget("dateAndTimeWidget", "isDateAndTimeActive")
          }
        >
          <div className="flex items-center justify-between w-full">
            Toggle clock
            {dateAndTimeWidget.isDateAndTimeActive && (
              <Check width={16} height={16} />
            )}
          </div>
        </MenubarItem>

        <MenubarSeparator />

        <MenubarItem
          onClick={() => toggleWidget("bookmarksWidget", "isBookmarksActive")}
        >
          <div className="flex items-center justify-between w-full">
            Toggle bookmarks
            {bookmarksWidget.isBookmarksActive && (
              <Check width={16} height={16} />
            )}
          </div>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};

export default WidgetControls;
