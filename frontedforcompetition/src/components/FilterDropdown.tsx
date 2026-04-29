import { useState } from "react";

type FilterDropdownProps = {
    title: string
    selectedValue: string
    setSelectedValue: (value: string) => void
    items: string[]
}

function FilterDropdown({
                            title,
                            selectedValue,
                            setSelectedValue,
                            items
                        }: FilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div
            className="Dropdown"
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className="DropdownLabel">{title}</div>

            <button
                className="DropdownButton"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedValue === "all" ? "Все" : selectedValue}
            </button>

            {isOpen && (
                <div className="DropdownMenu">
                    <button
                        className="DropdownItem"
                        type="button"
                        onClick={() => {
                            setSelectedValue("all")
                            setIsOpen(false)
                        }}
                    >
                        Все
                    </button>

                    {items.map((item) => (
                        <button
                            key={item}
                            className="DropdownItem"
                            type="button"
                            onClick={() => {
                                setSelectedValue(item)
                                setIsOpen(false)
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FilterDropdown;