import React from "react";
import { MENU_BAR_OPTIONS, THEMES_OPTIONS } from "../data/control-menu.data";
import useUIStore from "../stores/ui.store";
import { useTheme } from "./providers/ThemeProvider";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./ui/menubar";
import useWidgetsStore from "../stores/widgets.store";

const ControlMenu = () => {
  const { setWallpaper, wallpaper } = useUIStore();
  const { setTheme, theme } = useTheme();
  const { searchBarWidget, setSearchBarWidget } = useWidgetsStore();

  const themesOptions = THEMES_OPTIONS({ setTheme, theme });
  const options = MENU_BAR_OPTIONS({
    wallpaper,
    setWallpaper,
    themesOptions,
    handleToggleSearchBar: () =>
      setSearchBarWidget({
        isSearchBarActive: !searchBarWidget.isSearchBarActive,
      }),
    isSearchBarActive: searchBarWidget.isSearchBarActive,
    handleSearchBarVariantChange: (variant) => {
      setSearchBarWidget({
        ...searchBarWidget,
        variant,
      });
    },
    searchBarVariant: searchBarWidget.variant,
  });

  return (
    <Menubar>
      {options.map((option) => (
        <MenubarMenu key={option.name}>
          <MenubarTrigger className="text-foreground !cursor-pointer">
            {option.name}
          </MenubarTrigger>

          <MenubarContent>
            {option.items.map((item, index) => (
              <React.Fragment key={item.name}>
                {item.subContents ? (
                  <MenubarSub>
                    <MenubarSubTrigger>{item.name}</MenubarSubTrigger>
                    <MenubarSubContent>
                      {item.subContents.map((sub, subIndex) => (
                        <React.Fragment key={`${item.name}-sub-${subIndex}`}>
                          {sub}
                          {subIndex < item.subContents!.length - 1 && (
                            <MenubarSeparator />
                          )}
                        </React.Fragment>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                ) : (
                  <MenubarItem onClick={item.func}>{item.name}</MenubarItem>
                )}
                {index < option.items.length - 1 && <MenubarSeparator />}
              </React.Fragment>
            ))}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  );
};

export default ControlMenu;
