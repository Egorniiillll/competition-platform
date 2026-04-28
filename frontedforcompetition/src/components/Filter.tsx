type FilterProps = {
    filterType: string
    setFilterType: (value: string) => void

}

function Filter({filterType, setFilterType}: FilterProps) {
    return (
        <div>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">Все</option>
                <option value="n">футбол</option>
                <option value="chesse">шахматы</option>
            </select>
        </div>
    )
}

export default Filter;