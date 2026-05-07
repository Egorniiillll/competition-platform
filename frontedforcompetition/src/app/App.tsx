
import {Route, Routes, useLocation} from "react-router-dom";

import AccountPage from "../pages/AccountPage.tsx";
import GamePage from "../pages/GamePage.tsx";

import CompetitionPage from "../pages/CompetitionPage.tsx";
import NavBar from "../components/NavBar.tsx";
import GameDetailsPage from "../pages/GameDetailsPage.tsx";
import Registration from "../pages/Registration.tsx";
import NewEventPage from "../pages/MyEventsPage.tsx";

import CreateCompetitionPage from "../pages/CreateCompetitionPage.tsx";

import MyApplicationsPage from "../pages/MyApplicationsPage.tsx";
import MyEventsPage from "../pages/MyEventsPage.tsx";
import CompetitionDetailsPage from "../pages/CompetitionDetailsPage.tsx";

import CreateGamePage from "../pages/CreateGamePage.tsx";



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
                <Route path="/new-event" element={<NewEventPage />} />
                <Route path="/new-event/competition" element={<CreateCompetitionPage />} />
                <Route path="/new-event/game" element={<CreateGamePage />} />
                <Route path="/my-events" element={<MyEventsPage />} />
                <Route path="/my-applications" element={<MyApplicationsPage />} />
                <Route path="/competition/:id" element={<CompetitionDetailsPage />} />
            </Routes>
        </div>
    )
}

export default App

