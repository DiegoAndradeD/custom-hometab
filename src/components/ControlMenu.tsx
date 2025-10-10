import useUIStore from "../stores/ui.store";
import Randomizers from "../utils/Randomizers";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";

const ControlMenu = () => {
  const { setWallpaper } = useUIStore();
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="text-foreground">UI</MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onClick={() => {
              setWallpaper(Randomizers.getRandomWallpaper());
            }}
          >
            Change Wallpaper
          </MenubarItem>
          <MenubarSeparator />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
export default ControlMenu;
