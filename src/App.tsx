import ControlMenu from "./components/ControlMenu";
import useUIStore from "./stores/ui.store";

function App() {
  const { wallpaper, backdrop, isBackdropActive } = useUIStore();
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
      <section className="z-10">
        <header>
          <ControlMenu />
        </header>
      </section>
    </main>
  );
}

export default App;
