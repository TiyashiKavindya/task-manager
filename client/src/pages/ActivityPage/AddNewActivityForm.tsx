import { useState } from "react"
import DatePicker from "../../components/DatePicker"
import InputField from "../../components/InputField"
import MultiSelect from "../../components/MultiSelect"
import Select from "../../components/Select"
import TextArea from "../../components/TextArea"
import { useAppContext } from "../../contexts"
import { SelectOption } from "../../types"

const options: SelectOption[] = [
    { label: "First", value: 1 },
    { label: "Second", value: 2 },
    { label: "Third", value: 3 },
]

function AddNewActivityForm() {
    const { closeModal } = useAppContext()
    const [value, setValue] = useState<SelectOption[]>([options[0]])

    const handleSave = () => {
        console.log("Save")
        console.log(value)
        closeModal()
    }

    return (
        <div className="overflow-y-auto px-1">
            <div className="flex gap-2">
                <InputField label="Title" placeholder="Enter the title of the activity" name="title" />
                <Select className="w-28 text-sm md:text-base md:w-36" label="Status" options={options} />
            </div>
            <TextArea label="Description" placeholder="Enter a detailed description" />
            <MultiSelect className="mb-3" label="Tags" value={value} onChange={o => setValue(o)} options={options} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <DatePicker label="Start Date" />
                <DatePicker label="Due Date" />
            </div>
            <div className="mt-4 flex justify-between items-center">
                <button onClick={closeModal} className="btn border-2 border-emerald-500 text-emerald-500">Cancel</button>
                <button onClick={handleSave} className="btn border-2 border-emerald-500 bg-emerald-500 text-white hover:bg-emerald-600 ">Save</button>
            </div>
        </div>
    )
}

export default AddNewActivityForm

