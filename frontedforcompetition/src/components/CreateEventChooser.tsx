type CreateEventChooserProps = {
    setSelectedForm: (value: string) => void
}

function CreateEventChooser({ setSelectedForm }: CreateEventChooserProps) {
    return (
        <div className="CreateEventChooser">
            <button
                className="ChooseEventButton"
                onClick={() => setSelectedForm("game")}
            >
                Создать игру
            </button>

            <button
                className="ChooseEventButton"
                onClick={() => setSelectedForm("competition")}
            >
                Создать соревнование
            </button>
        </div>
    )
}

export default CreateEventChooser;