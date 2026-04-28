
import "../styles/CompetitionCard.css";
type CompetitionCardProps = {
    id: number
    title: string
    description: string
    location: string
    startDate: string
    endDate: string

}

function CompetitionCard({id, title, description, location, startDate, endDate} :CompetitionCardProps){
    return(
        <div className="CompetitionCard">
            <h2>{title}</h2>
            <p>id: {id}</p>
            <p>description: {description}</p>
            <p>location: {location}</p>
            <p>startDate: {startDate}</p>
            <p>endDate: {endDate}</p>
        </div>
    )
}
export default CompetitionCard