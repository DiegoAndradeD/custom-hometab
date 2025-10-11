import { Check } from "lucide-react";
import useUIStore from "../stores/ui.store";
import { MenubarItem } from "./ui/menubar";
import { Slider } from "./ui/slider";
import { cn } from "../lib/utils";

const BackdropControl = () => {
  const { backdrop, setBackdrop, toggleBackdrop, isBackdropActive } =
    useUIStore();
  return (
    <div className="py-2 flex flex-col gap-2">
      <div className="flex items-center gap-1 cursor-pointer hover:bg-accent rounded-sm px-2">
        <MenubarItem
          className="hover:!bg-transparent cursor-pointer w-full"
          onClick={() => toggleBackdrop()}
        >
          <p>Toggle backdrop</p>
        </MenubarItem>
        {isBackdropActive && <Check width={16} height={16} />}
      </div>
      <div className="p-2 px-4">
        <Slider
          defaultValue={[backdrop]}
          max={100}
          step={1}
          onValueChange={(value) => setBackdrop(value[0])}
          disabled={!isBackdropActive}
          className={cn({
            "opacity-40": !isBackdropActive,
          })}
        />
      </div>
    </div>
  );
};
export default BackdropControl;
