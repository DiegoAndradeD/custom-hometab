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
import { Image as ImageIcon } from "lucide-react";
// Hooks
import { themes, useTheme } from "../providers/ThemeProvider";
// Stores
import useUIStore from "../../stores/ui.store";
// Data
import { allWallpapers } from "../../data/wallpapers.data";

const ThemeOptions = () => {
  const { setTheme, theme } = useTheme();

  return (
    <>
      {themes.map((themeName) => {
        const themeValue = themeName.toLowerCase();
        return (
          <MenubarItem
            key={themeValue}
            onClick={() => setTheme(themeValue as any)}
          >
            <div className="flex items-center justify-between w-full capitalize">
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

  const getNextWallpaper = (current: string): string => {
    const currentIndex = allWallpapers.indexOf(current);
    let nextIndex = currentIndex + 1;

    if (nextIndex >= allWallpapers.length) {
      nextIndex = 0;
    }

    return allWallpapers[nextIndex];
  };

  const handleChangeWallpaper = () => {
    const nextWallpaperUrl = getNextWallpaper(wallpaper);
    const img = new Image();
    img.src = nextWallpaperUrl;
    img.onload = () => {
      setWallpaper(nextWallpaperUrl);
    };
  };

  return (
    <MenubarMenu>
      <MenubarTrigger className="text-foreground !cursor-pointer p-0 bg-transparent hover:bg-transparent">
        <ImageIcon width={16} height={16} />
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem onClick={handleChangeWallpaper}>
          Change Wallpaper
        </MenubarItem>
        <MenubarSeparator />
        <MenubarSub>
          <MenubarSubTrigger>Change Theme</MenubarSubTrigger>
          <MenubarSubContent className="h-60 overflow-y-auto ">
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
