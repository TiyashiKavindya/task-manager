import { useEffect, useState } from "react"
import DatePicker from "../../components/DatePicker"
import InputField from "../../components/InputField"
import MultiSelect from "../../components/MultiSelect"
import Select from "../../components/Select"
import TextArea from "../../components/TextArea"
import Loading from "../../components/Loading"
import { useAppContext } from "../../contexts"
import { SelectOption } from "../../types"
import { getSelectOptions } from "../../api"

function AddNewTaskForm() {
    const { closeModal, loading, stopLoading } = useAppContext()
    const [tags, setTags] = useState<SelectOption[]>([])
    const [statuses, setstatuses] = useState<SelectOption[]>([])
    const [value, setValue] = useState<SelectOption[]>([])

    const getFormDefaultValues = async () => {
        loading()
        try {
            const res = await getSelectOptions()
            setTags(res.tags)
            setstatuses(res.statuses)
            stopLoading()
        } catch (err) {
            stopLoading(err)
        }
    }

    const handleSave = () => {
        console.log("Save")
        console.log(value)
        closeModal()
    }

    useEffect(() => {
        getFormDefaultValues()
    }, [])

    return (
        <div className="overflow-y-auto px-1">
            <Loading>
                <div className="flex gap-2">
                    <InputField label="Title" placeholder="Enter the title of the task" name="title" />
                    <Select className="w-28 text-sm md:text-base md:w-36" label="Status" options={statuses} />
                </div>
                <TextArea label="Description" placeholder="Enter a detailed description" />
                <MultiSelect className="mb-3" label="Tags" value={value} onChange={o => setValue(o)} options={tags} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <DatePicker label="Start Date" />
                    <DatePicker label="Due Date" />
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <button onClick={closeModal} className="btn border-2 border-emerald-500 text-emerald-500">Cancel</button>
                    <button onClick={handleSave} className="btn border-2 border-emerald-500 bg-emerald-500 text-white hover:bg-emerald-600 ">Save</button>
                </div>
            </Loading>
        </div>
    )
}

export default AddNewTaskForm

