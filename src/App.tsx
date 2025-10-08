// src/App.tsx

import SearchBar from "./components/SearchBar";

function App() {
  return (
    // 1. O Contêiner Principal com o gradiente de fundo
    <div
      className="
      relative
      flex justify-center items-center
      min-h-screen w-full
      bg-gray-900 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900
      text-white font-sans p-4
    "
    >
      <div className="absolute inset-0 w-full h-full bg-white/10 backdrop-blur-xl z-0"></div>
      <div className="relative z-10 w-full">
        <div
          className="

        "
        >
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default App;
