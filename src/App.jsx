import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import CreatePlaylist from "./pages/CreatePlaylist.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/create-playlist" element={<CreatePlaylist />} />
      </Routes>
    </Router>
  );
}

export default App;
