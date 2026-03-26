
import Navbar from "./Navbar.tsx";


function App() {
    return (
        <div>

            <Navbar/>
            <Routes>
                <Route path="/" element={<h1>home</h1>}/>
                <Route path="/competition" element={<h1>competition</h1>}/>
                <Route path="/account" element={<h1>account</h1>}/>
            </Routes>

        </div>

    )
}

export default App
