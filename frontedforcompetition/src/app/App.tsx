
import {Route, Routes, useLocation} from "react-router-dom";

import AccountPage from "../pages/AccountPage.tsx";
import GamePage from "../pages/GamePage.tsx";

import CompetitionPage from "../pages/CompetitionPage.tsx";
import NavBar from "../components/NavBar.tsx";
import GameDetailsPage from "../pages/GameDetailsPage.tsx";
import Registration from "../pages/Registration.tsx";



function App() {

    const location = useLocation();

    const showNavBar = location.pathname !== "/";

    return (

        <div>
            {showNavBar && <NavBar />}
            <Routes>
                <Route path="/" element={<Registration />} />
                <Route path="/game" element={<GamePage />} />
                <Route path="/competition" element={<CompetitionPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/game/:id" element={<GameDetailsPage />} />
            </Routes>
        </div>
    )
}

export default App

