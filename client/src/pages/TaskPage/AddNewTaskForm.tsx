import DatePicker from "../../components/DatePicker"
import InputField from "../../components/InputField"
import MultiSelect from "../../components/MultiSelect"
import Select from "../../components/Select"
import TextArea from "../../components/TextArea"
import { useAppContext } from "../../contexts"
import { SelectOption } from "../../types"

const selectOp: SelectOption[] = [
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Done', value: 'DONE' }
]

function AddNewTaskForm() {
    const { closeModal } = useAppContext()
    return (
        <div className="overflow-y-auto">
            <div className="flex gap-2">
                <InputField label="Title" placeholder="Enter the title of the task" name="title" />
                <Select className="w-28 text-sm md:text-base md:w-36" label="Status" options={selectOp} />
            </div>
            <TextArea label="Description" placeholder="Enter a detailed description" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <DatePicker label="Start Date" />
                <DatePicker label="Due Date" />
            </div>
            <MultiSelect label="Assignees" options={selectOp} />
            <div className="mt-4 flex justify-between items-center">
                <button onClick={closeModal} className="btn border-2 border-emerald-500 text-emerald-500">Cancel</button>
                <button onClick={closeModal} className="btn border-2 border-emerald-500 bg-emerald-500 text-white hover:bg-emerald-600 ">Save</button>
            </div>
        </div>
    )
}

export default AddNewTaskForm

