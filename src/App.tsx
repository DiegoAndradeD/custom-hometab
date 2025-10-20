// Components
import BookmarkList from "./components/bookmarks/BookmarkList";
import UpsertBookmarkModal from "./components/bookmarks/UpsertBookmarkModal";
import ControlMenu from "./components/ControlMenu";
import DateAndTime from "./components/DateAndTime";
import SearchBar from "./components/SearchBar";
// Stores
import useModalStore, { LayoutModal } from "./stores/modal.store";
import useUIStore from "./stores/ui.store";
import useWidgetsStore from "./stores/widgets.store";

function App() {
  const { wallpaper, backdrop, isBackdropActive } = useUIStore();
  const { searchBarWidget, dateAndTimeWidget, bookmarksWidget } =
    useWidgetsStore();

  const modalRegistry: Record<LayoutModal, React.ComponentType> = {
    [LayoutModal.UpsertBookmark]: UpsertBookmarkModal,
  };

  const modalState = useModalStore();

  return (
    <main
      className="relative flex min-h-screen w-full text-white font-sans p-4 bg-cover bg-center bg-fixed transition-all duration-500"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div
        className="absolute inset-0 w-full h-full bg-black/30 z-0"
        style={{
          backdropFilter: `${isBackdropActive ? `blur(${backdrop}px)` : ""}`,
        }}
      ></div>

      <section className="z-10 w-full min-h-full overflow-y-hidden">
        {Object.entries(modalRegistry).map(([modalKey, Component]) => {
          if (modalState[modalKey as keyof typeof modalRegistry]) {
            return <Component key={modalKey} />;
          }
          return null;
        })}
        <header className="w-full flex items-center justify-between">
          <ControlMenu />
          {dateAndTimeWidget.isDateAndTimeActive && <DateAndTime />}
        </header>
        <div className="flex flex-col items-center justify-center h-full w-full gap-6">
          <div
            className={
              searchBarWidget.isSearchBarActive ? "block" : "invisible"
            }
          >
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
