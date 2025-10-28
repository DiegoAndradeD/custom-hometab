// Components
import UIControls from "./menu/UIControls";
import WidgetControls from "./menu/WidgetControls";
import { Menubar } from "./ui/menubar";

const ControlMenu = () => {
  return (
    <Menubar className="rounded-2xl px-4 py-1 gap-4 h-7">
      <UIControls />
      <WidgetControls />
    </Menubar>
  );
};

export default ControlMenu;
