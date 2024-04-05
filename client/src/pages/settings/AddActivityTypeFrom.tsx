import { FormEvent } from "react"
import InputField from "../../components/InputField"
import { useAppContext } from "../../contexts"

function AddActivityTypeFrom() {
    const { closeModal } = useAppContext()

    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.currentTarget))
        console.log(formData)
        closeModal()
    }

    return (
        <>
            <form onSubmit={handleSave}>
                <InputField required label="Activity Type" placeholder="Enter Activity Type" name="title" />
                <div className="mt-4 flex justify-between items-center">
                    <button type="button" onClick={closeModal} className="btn border-2 border-dark text-dark">Cancel</button>
                    <button type="submit" className="btn border-2 border-light bg-dark text-white hover:bg-dark-light">Save</button>
                </div>
            </form>
        </>
    )
}

export default AddActivityTypeFrom