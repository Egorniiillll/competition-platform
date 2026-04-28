import "../styles/GameCard.css";
type GameCardProps = {
    id: number
    name: string
    description: string
    types: string
    createdAt: string
}

function GameCard({ id, name, description, types, createdAt }: GameCardProps) {
    return (
        <div className="GameCard">
            <h2>{name}</h2>
            <p>id: {id}</p>
            <p>description: {description}</p>
            <p>types: {types}</p>
            <p>createdAt: {createdAt}</p>
        </div>
    )
}

export default GameCard