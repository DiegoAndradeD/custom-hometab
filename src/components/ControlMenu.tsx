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

const ControlMenu = () => {
  const { setWallpaper, wallpaper } = useUIStore();
  const { setTheme, theme } = useTheme();
  const themesOptions = THEMES_OPTIONS({ setTheme, theme });

  const options = MENU_BAR_OPTIONS({ wallpaper, setWallpaper, themesOptions });

  return (
    <Menubar>
      <MenubarMenu>
        {options.map((option) => (
          <>
            <MenubarTrigger className="text-foreground">
              {option.name}
            </MenubarTrigger>

            <MenubarContent>
              {option.items.map((item, index) => (
                <>
                  {item.subContent ? (
                    <MenubarSub>
                      <MenubarSubTrigger>{item.name}</MenubarSubTrigger>
                      <MenubarSubContent>{item.subContent}</MenubarSubContent>
                    </MenubarSub>
                  ) : (
                    <MenubarItem key={item.name + index} onClick={item.func}>
                      {item.name}
                    </MenubarItem>
                  )}
                  {index !== option.items.length - 1 && <MenubarSeparator />}
                </>
              ))}
            </MenubarContent>
          </>
        ))}
      </MenubarMenu>
    </Menubar>
  );
};
export default ControlMenu;
