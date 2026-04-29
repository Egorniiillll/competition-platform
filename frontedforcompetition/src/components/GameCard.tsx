import "../styles/GameCard.css";
import { Link } from "react-router-dom";

type GameCardProps = {
    id: number
    name: string
    description: string
    types: string
    createdAt: string
    startDate: string
    endDate: string
    city: string
    address: string
    price: string
    imageURL: string
}

function GameCard({
                      id,
                      name,
                      imageURL,
                      description,
                      types,
                      createdAt,
                      startDate,
                      endDate,
                      city,
                      address,
                      price
                  }: GameCardProps) {
    return (
        <Link to={`/game/${id}`} className="GameCardLink">
            <div className="GameCard">
                <div className="GameCardImageBlock">
                    {imageURL && <img src={imageURL} alt={name} className="GameImage" />}
                </div>

                <div className="GameCardContent">
                    <h2>{name}</h2>
                    <p>description: {description}</p>
                    <p>types: {types}</p>
                    <p>createdAt: {createdAt}</p>
                    <p>city: {city}</p>
                    <p>startDate: {startDate}</p>
                    <p>endDate: {endDate}</p>
                    <p>address: {address}</p>
                    <p>price: {price}</p>
                </div>
            </div>
        </Link>
    )
}

export default GameCard;