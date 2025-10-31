// Components
import { Settings } from "lucide-react";
import {
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar";
import WidgetToggleItem from "./WidgetToggleItem";
import WidgetVariantSelector from "./WidgetVariantSelector";
// Stores
import useWidgetsStore from "../../stores/widgets.store";
// Data
import { INPUT_VARIANT_OPTIONS } from "../ui/input";
// Utils
import { Formatters } from "../../utils";
// Enums
import {
  DateTimeVariant,
  DateTimeVariantStringRepresentation,
} from "../../enums";

const DATE_TIME_VARIANT_OPTIONS = Formatters.createEnumMap(
  DateTimeVariant,
  DateTimeVariantStringRepresentation
);

const WidgetControls = () => {
  const {
    searchBarWidget,
    dateAndTimeWidget,
    bookmarksWidget,
    stickyNotesWidget,
    newsFeedWidget,
    weatherWidget,
  } = useWidgetsStore();

  return (
    <MenubarMenu>
      <MenubarTrigger className="text-foreground !cursor-pointer p-0">
        <Settings width={16} height={16} />
      </MenubarTrigger>
      <MenubarContent>
        <MenubarSub>
          <MenubarSubTrigger>Search Bar</MenubarSubTrigger>
          <MenubarSubContent>
            <WidgetToggleItem
              label="Search Bar"
              widgetKey="searchBarWidget"
              toggleProperty="isSearchBarActive"
              isActive={searchBarWidget.isSearchBarActive}
            />
            <MenubarSeparator />
            <WidgetVariantSelector
              widgetKey="searchBarWidget"
              currentVariant={searchBarWidget.variant}
              options={INPUT_VARIANT_OPTIONS}
            />
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSeparator />

        <MenubarSub>
          <MenubarSubTrigger>Clock</MenubarSubTrigger>
          <MenubarSubContent>
            <WidgetToggleItem
              label="Toggle clock"
              widgetKey="dateAndTimeWidget"
              toggleProperty="isDateAndTimeActive"
              isActive={dateAndTimeWidget.isDateAndTimeActive}
            />
            <MenubarSeparator />
            <WidgetVariantSelector
              widgetKey="dateAndTimeWidget"
              currentVariant={dateAndTimeWidget.variant}
              options={DATE_TIME_VARIANT_OPTIONS}
            />
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSeparator />

        <WidgetToggleItem
          label="Bookmarks"
          widgetKey="bookmarksWidget"
          toggleProperty="isBookmarksActive"
          isActive={bookmarksWidget.isBookmarksActive}
        />

        <MenubarSeparator />

        <WidgetToggleItem
          label="Sticky Notes"
          widgetKey="stickyNotesWidget"
          toggleProperty="isStickyNotesActive"
          isActive={stickyNotesWidget.isStickyNotesActive}
        />

        <MenubarSeparator />

        <WidgetToggleItem
          label="News Feed"
          widgetKey="newsFeedWidget"
          toggleProperty="isNewsFeedActive"
          isActive={newsFeedWidget.isNewsFeedActive}
        />

        <MenubarSeparator />

        <WidgetToggleItem
          label="Weather"
          widgetKey="weatherWidget"
          toggleProperty="isWeatherWidgetActive"
          isActive={weatherWidget.isWeatherWidgetActive}
        />
      </MenubarContent>
    </MenubarMenu>
  );
};

export default WidgetControls;
