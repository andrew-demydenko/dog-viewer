import "./App.css";
import { DogsViewer } from "@/components/DongsViewer";
import { FavoritesProvider } from "@/providers/FavoritesProvider";

function App() {
  return (
    <div className="container">
      <h1>Dog Image Viewer</h1>
      <FavoritesProvider>
        <DogsViewer />
      </FavoritesProvider>
    </div>
  );
}

export default App;
