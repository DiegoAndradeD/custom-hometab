// Components
import { useEffect, useState } from "react";
import BookmarkList from "./components/bookmarks/BookmarkList";
import UpsertBookmarkModal from "./components/bookmarks/UpsertBookmarkModal";
import ControlMenu from "./components/ControlMenu";
import DateAndTime from "./components/DateAndTime";
import SearchBar from "./components/SearchBar";
import Weather from "./components/Weather";
import StickyNotes from "./components/stickyNotes/StickyNotes";
// Stores
import useModalStore, { LayoutModal } from "./stores/modal.store";
import useUIStore from "./stores/ui.store";
import useWidgetsStore from "./stores/widgets.store";

function App() {
  const { wallpaper, backdrop, isBackdropActive } = useUIStore();
  const {
    searchBarWidget,
    dateAndTimeWidget,
    bookmarksWidget,
    stickyNotesWidget,
  } = useWidgetsStore();

  const modalRegistry: Record<LayoutModal, React.ComponentType> = {
    [LayoutModal.UpsertBookmark]: UpsertBookmarkModal,
  };

  const modalState = useModalStore();

  const [currentWallpaper, setCurrentWallpaper] = useState(wallpaper);
  const [_, setPreviousWallpaper] = useState("");
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (wallpaper !== currentWallpaper) {
      setPreviousWallpaper(currentWallpaper);
      setCurrentWallpaper(wallpaper);
      setIsFading(true);

      const timer = setTimeout(() => {
        setIsFading(false);
        setPreviousWallpaper("");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [wallpaper, currentWallpaper]);

  return (
    <main
      className="relative flex min-h-screen w-full text-white font-sans p-4 bg-cover bg-center bg-fixed transition-all duration-500"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `url(${currentWallpaper})`,
          opacity: isFading ? 0 : 1,
        }}
      />
      <div
        className="absolute inset-0 w-full h-full bg-black/30 z-0"
        style={{
          backdropFilter: `${isBackdropActive ? `blur(${backdrop}px)` : ""}`,
        }}
      />
      <section className="z-10 w-full min-h-full overflow-y-hidden">
        {Object.entries(modalRegistry).map(([modalKey, Component]) => {
          if (modalState[modalKey as keyof typeof modalRegistry]) {
            return <Component key={modalKey} />;
          }
          return null;
        })}
        <header className="w-full flex items-center">
          <div className="flex-1 flex justify-start gap-1">
            <ControlMenu />
            <Weather />
          </div>
          <div className="flex justify-start gap-1">
            {stickyNotesWidget.isStickyNotesActive && <StickyNotes />}
            {dateAndTimeWidget.isDateAndTimeActive && (
              <div className="flex justify-center">
                <DateAndTime />
              </div>
            )}
          </div>
        </header>
        <div className="flex flex-col items-center justify-center h-full w-full gap-2 relative">
          <div
            className={
              searchBarWidget.isSearchBarActive
                ? "flex flex-col gap-8 items-center"
                : "invisible"
            }
          >
            <h1 className="text-8xl font-bold text-shadow-md">Google</h1>
            <SearchBar />
          </div>
          <div
            className={
              bookmarksWidget.isBookmarksActive ? "block" : "invisible"
            }
          >
            <BookmarkList />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
