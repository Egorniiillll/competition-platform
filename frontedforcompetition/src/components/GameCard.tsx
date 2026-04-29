import "../styles/GameCard.css";

type GameCardProps = {
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
    )
}

export default GameCard;