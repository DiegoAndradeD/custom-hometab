// Components
import { Check } from "lucide-react";
import BackdropControl from "../BackdropControl";
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
// Hooks
import { useTheme } from "../providers/ThemeProvider";
// Stores
import useUIStore from "../../stores/ui.store";
// Utils
import { Randomizers } from "../../utils";

const ThemeOptions = () => {
  const { setTheme, theme } = useTheme();
  const themes = ["Light", "Dark", "System"];

  return (
    <>
      {themes.map((themeName) => {
        const themeValue = themeName.toLowerCase();
        return (
          <MenubarItem
            key={themeValue}
            onClick={() => setTheme(themeValue as any)}
          >
            <div className="flex items-center justify-between w-full">
              {themeName}
              {theme === themeValue && <Check width={16} height={16} />}
            </div>
          </MenubarItem>
        );
      })}
    </>
  );
};

const UIControls = () => {
  const { wallpaper, setWallpaper } = useUIStore();

  const handleChangeWallpaper = () => {
    const nextWallpaperUrl = Randomizers.getRandomWallpaper(wallpaper);
    const img = new Image();
    img.src = nextWallpaperUrl;
    img.onload = () => {
      setWallpaper(nextWallpaperUrl);
    };
  };

  return (
    <MenubarMenu>
      <MenubarTrigger className="text-foreground !cursor-pointer">
        UI
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem onClick={handleChangeWallpaper}>
          Change Wallpaper
        </MenubarItem>
        <MenubarSeparator />
        <MenubarSub>
          <MenubarSubTrigger>Change Theme</MenubarSubTrigger>
          <MenubarSubContent>
            <ThemeOptions />
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarSub>
          <MenubarSubTrigger>Backdrop</MenubarSubTrigger>
          <MenubarSubContent>
            <BackdropControl />
          </MenubarSubContent>
        </MenubarSub>
      </MenubarContent>
    </MenubarMenu>
  );
};

export default UIControls;
