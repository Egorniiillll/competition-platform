import { useParams } from "react-router-dom";

function GameDetailsPage() {
    const { id } = useParams();

    return (
        <div>
            <h1>Страница игры</h1>
            <p>id: {id}</p>
        </div>
    )
}

export default GameDetailsPage;