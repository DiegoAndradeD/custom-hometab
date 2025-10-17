import BackdropControl from "../components/BackdropControl";
import SubmenuList, {
  type ISubmenuItem,
} from "../components/common/SubmenuList";
import type { TTheme } from "../components/providers/ThemeProvider";
import {
  INPUT_VARIANT_OPTIONS,
  type TInputVariant,
} from "../components/ui/input";
import Randomizers from "../utils/Randomizers";

interface IMenuBarOptionsProps {
  wallpaper: string;
  setWallpaper: (wallpaper: string) => void;
  themesOptions: ISubmenuItem[];
  handleToggleSearchBar: () => void;
  isSearchBarActive: boolean;
  handleSearchBarVariantChange: (variant: TInputVariant) => void;
  searchBarVariant: TInputVariant;
  handleToggleDateAndTime: () => void;
  isDateAndTimeActive: boolean;
}

interface IMenuBarOptions {
  name: string;
  items: Array<{
    name: string;
    func?: () => void;
    subContents?: React.ReactNode[];
    isActive?: boolean;
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
  handleSearchBarVariantChange,
  searchBarVariant,
  handleToggleDateAndTime,
  isDateAndTimeActive,
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
            <SubmenuList
              key="search-bar-variant"
              items={INPUT_VARIANT_OPTIONS.map((variant) => ({
                name: variant ?? "",
                onClick: () => handleSearchBarVariantChange(variant),
                isActive: searchBarVariant === variant,
              }))}
            />,
          ],
        },
        {
          name: "Toggle clock",
          func: () => {
            handleToggleDateAndTime();
          },
          isActive: isDateAndTimeActive,
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
