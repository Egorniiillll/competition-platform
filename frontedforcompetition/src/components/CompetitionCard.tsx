import "../styles/CompetitionCard.css";
import { Link } from "react-router-dom";

type CompetitionCardProps = {
    id: number
    title: string
    description: string
    shortDescription: string
    createdAt: string
    startDate: string
    endDate: string
    city: string
    address: string
    entryFee: string
    imageURL: string
}

function CompetitionCard({
                             id,
                             title,
                             imageURL,
                             description,
                             shortDescription,
                             startDate,
                             endDate,
                             city,
                             address,
                             entryFee
                         }: CompetitionCardProps) {

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
        <Link to={`/competition/${id}`} className="CompetitionCardLink">
            <div className="CompetitionCard">
                <div className="CompetitionCardImageBlock">
                    {imageURL && (
                        <img
                            src={imageURL}
                            alt={title}
                            className="CompetitionImage"
                        />
                    )}
                </div>

                <div className="CompetitionCardContent">
                    <h2>{title}</h2>

                    <p className="CompetitionShortDescription">
                        {shortDescription || description}
                    </p>

                    <div className="CompetitionCardInfo">
                        <p><span>Город:</span> {city}</p>
                        <p><span>Начало:</span> {formatDate(startDate)}</p>
                        <p><span>Окончание:</span> {formatDate(endDate)}</p>
                        <p><span>Адрес:</span> {address}</p>
                        <p><span>Цена:</span> {entryFee} ₽</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CompetitionCard;