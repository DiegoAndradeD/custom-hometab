import BackdropControl from "../components/BackdropControl";
import SubmenuList, {
  type ISubmenuItem,
} from "../components/common/SubmenuList";
import type { TTheme } from "../components/providers/ThemeProvider";
import Randomizers from "../utils/Randomizers";

interface IMenuBarOptionsProps {
  wallpaper: string;
  setWallpaper: (wallpaper: string) => void;
  themesOptions: ISubmenuItem[];
}

interface IMenuBarOptions {
  name: string;
  items: {
    name: string;
    func: () => void;
    subContent?: React.ReactNode;
  }[];
}

interface IThemesProps {
  setTheme: (theme: TTheme) => void;
  theme: TTheme;
}

export const MENU_BAR_OPTIONS = ({
  wallpaper,
  setWallpaper,
  themesOptions,
}: IMenuBarOptionsProps): IMenuBarOptions[] => {
  return [
    {
      name: "UI",
      items: [
        {
          name: "Change Wallpaper",
          func: () => {
            const next = Randomizers.getRandomWallpaper(wallpaper);
            setWallpaper(next);
          },
        },
        {
          name: "Change Theme",
          func: () => {},
          subContent: <SubmenuList title="Themes" items={themesOptions} />,
        },
        {
          name: "Backdrop",
          func: () => {},
          subContent: <BackdropControl />,
        },
      ],
    },
  ];
};

export const THEMES_OPTIONS = ({
  setTheme,
  theme,
}: IThemesProps): ISubmenuItem[] => [
  {
    name: "Light",
    onClick: () => setTheme("light"),
    isActive: theme === "light",
  },
  {
    name: "Dark",
    onClick: () => setTheme("dark"),
    isActive: theme === "dark",
  },
  {
    name: "System",
    onClick: () => setTheme("system"),
    isActive: theme === "system",
  },
];
