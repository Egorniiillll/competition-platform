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
                             createdAt,
                             startDate,
                             endDate,
                             city,
                             address,
                             entryFee
                         }: CompetitionCardProps) {
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
                    <p>shortDescription: {shortDescription}</p>
                    <p>description: {description}</p>
                    <p>createdAt: {createdAt}</p>
                    <p>city: {city}</p>
                    <p>startDate: {startDate}</p>
                    <p>endDate: {endDate}</p>
                    <p>address: {address}</p>
                    <p>entryFee: {entryFee}</p>
                </div>
            </div>
        </Link>
    )
}

export default CompetitionCard;