import Navbar from "../Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import Game from "../pages/Game.tsx";
import AccountPage from "../pages/AccountPage.tsx";


function App() {
    return (
        <div>

            <Navbar/>
            <Routes>
                <Route path="/" element={<h1>home</h1>}/>
                <Route path="/Game" element={<Game/>}/>
                <Route path="/competition" element={<h1>competition</h1>}/>
                <Route path="/account" element={<AccountPage/>}/>
            </Routes>

        </div>

    )
}

export default App
