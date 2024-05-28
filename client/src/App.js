import { Routes, BrowserRouter, Route } from "react-router-dom";

import LibraryPage from "./views/libraryPage";
import MainPage from "./views/mainPage";
import Sidebar from "./views/components/sidebar";
import Credits from "./views/components/credits";
import CreateMediaPage from "./views/createNewMediaPage";
import MediaDetailsPage from "./views/viewMediaPage";
import UploadStatus from "./views/components/uploadStatus";

function App() {
    return (
        <BrowserRouter>
            <Sidebar />
            <Routes>
                <Route exact path="/" element={<MainPage />} />
                <Route exact path="/library" element={<LibraryPage />} />
                <Route path="/medias/:id" element={<MediaDetailsPage />} />
                <Route exact path="/create_new" element={<CreateMediaPage />} />
                <Route path="/upload-status/:Status" element={<UploadStatus />} />
            </Routes>
            <Credits />
        </BrowserRouter>
    );
}

export default App;
