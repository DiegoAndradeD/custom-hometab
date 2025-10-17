import UIControls from "./menu/UIControls";
import WidgetControls from "./menu/WidgetControls";
import { Menubar } from "./ui/menubar";

const ControlMenu = () => {
  return (
    <Menubar>
      <UIControls />
      <WidgetControls />
    </Menubar>
  );
};

export default ControlMenu;
