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
                      startDate,
                      endDate,
                      city,
                      address,
                      price
                  }: GameCardProps) {

    function formatDate(date: string) {
        return new Date(date).toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    return (
        <Link to={`/game/${id}`} className="GameCardLink">
            <div className="GameCard">
                <div className="GameCardImageBlock">
                    {imageURL && (
                        <img src={imageURL} alt={name} className="GameImage" />
                    )}
                </div>

                <div className="GameCardContent">
                    <h2>{name}</h2>

                    <p className="GameDescription">
                        {description}
                    </p>

                    <div className="GameCardInfo">
                        <p><span>Тип:</span> {types}</p>
                        <p><span>Город:</span> {city}</p>
                        <p><span>Начало:</span> {formatDate(startDate)}</p>
                        <p><span>Окончание:</span> {formatDate(endDate)}</p>
                        <p><span>Адрес:</span> {address}</p>
                        <p><span>Цена:</span> {price} ₽</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default GameCard;