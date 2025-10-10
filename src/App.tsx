import ControlMenu from "./components/ControlMenu";
import { cn } from "./lib/utils";
import useUIStore from "./stores/ui.store";

function App() {
  const { wallpaper } = useUIStore();
  return (
    <main
      className={cn(
        `relative flex min-h-screen w-full
         text-white font-sans p-4 bg-[url('${wallpaper}')]
         bg-cover bg-center bg-fixed`
      )}
    >
      <div
        className="
          absolute inset-0 w-full h-full
          backdrop-blur-sm bg-black/30
          z-0
        "
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
