import FilterDropdown from "./FilterDropdown";

type FilterProps = {
    filterType: string
    setFilterType: (value: string) => void
    filterCity: string
    setFilterCity: (value: string) => void
    types: string[]
    cities: string[]
}

function Filter({
                    filterType,
                    setFilterType,
                    filterCity,
                    setFilterCity,
                    types,
                    cities
                }: FilterProps) {
    return (
        <div className="FilterPanel">
            <FilterDropdown
                title="Тип"
                selectedValue={filterType}
                setSelectedValue={setFilterType}
                items={types}
            />

            <FilterDropdown
                title="Город"
                selectedValue={filterCity}
                setSelectedValue={setFilterCity}
                items={cities}
            />
        </div>
    )
}

export default Filter;