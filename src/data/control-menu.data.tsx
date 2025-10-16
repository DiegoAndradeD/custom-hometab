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
  handleToggleSearchBar: () => void;
  isSearchBarActive: boolean;
}

interface IMenuBarOptions {
  name: string;
  items: Array<{
    name: string;
    func?: () => void;
    subContents?: React.ReactNode[];
  }>;
}

interface IThemesProps {
  setTheme: (theme: TTheme) => void;
  theme: TTheme;
}

export const MENU_BAR_OPTIONS = ({
  wallpaper,
  setWallpaper,
  themesOptions,
  handleToggleSearchBar,
  isSearchBarActive,
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
          subContents: [
            <SubmenuList key="themes" title="Themes" items={themesOptions} />,
          ],
        },
        {
          name: "Backdrop",
          subContents: [<BackdropControl key="backdrop" />],
        },
      ],
    },
    {
      name: "WIDGETS",
      items: [
        {
          name: "Search Bar",
          subContents: [
            <SubmenuList
              key="search-bar"
              items={[
                {
                  name: "Toggle search bar",
                  onClick: handleToggleSearchBar,
                  isActive: isSearchBarActive,
                },
              ]}
            />,
            <SubmenuList key="search-bar-variant" items={} />,
          ],
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
