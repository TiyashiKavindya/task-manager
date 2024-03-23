import { FormEvent, useEffect, useState } from "react"
import DatePicker from "../../components/DatePicker"
import InputField from "../../components/InputField"
import TextArea from "../../components/TextArea"
import Loading from "../../components/Loading"
import { useAppContext } from "../../contexts"
import { SelectOption } from "../../types"
import { getSelectOptions, saveTasks } from "../../api"
import RMSelect from 'react-select'
import { MultiValue } from 'react-select'


type AddNewTaskFormProps = {
    refetch: () => void
}

function AddNewTaskForm({ refetch }: AddNewTaskFormProps) {
    const { closeModal, toast } = useAppContext()
    const [tags, setTags] = useState<SelectOption[]>([])
    const [statuses, setstatuses] = useState<SelectOption[]>([])
    const [multiSelectValue, setMultiSelectValue] = useState<MultiValue<SelectOption>>([])

    const getFormDefaultValues = async () => {
        try {
            const res = await getSelectOptions()
            setTags(res.tags.map((tag: any) => ({ label: tag.name, value: tag.id })) as SelectOption[])
            setstatuses(res.statuses.map((status: any) => ({ label: status.title, value: status.id })) as SelectOption[])
        } catch (err) {
            console.log(err)
        }
    }

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.currentTarget))
        const tags = multiSelectValue.map(o => o.value)
        try {
            const res = await saveTasks({ ...formData, tags })
            if (res.data.success) {
                toast('Task Created', 'Task saved successfully')
                refetch()
            } else {
                toast('Task Failed', 'Task creation failed')
            }
        } catch (err: any) {
            console.log(err)
            toast('Task Failed', err.message as string)
        } finally {
            closeModal()
            setMultiSelectValue([])
        }
    }

    useEffect(() => {
        getFormDefaultValues()
    }, [])

    return (
        <div className="overflow-y-auto px-1">
            <Loading>
                <form onSubmit={handleSave}>
                    <div className="flex gap-2">
                        <InputField required label="Title" placeholder="Enter the title of the task" name="name" />
                        <div className="w-36">
                            <label>Status</label>
                            <RMSelect
                                required
                                className="mt-1 w-full"
                                name="status_id"
                                options={statuses}
                                defaultValue={statuses[0]}
                            />
                        </div>
                    </div>
                    <TextArea required rows={4} label="Description" name="content" placeholder="Enter a detailed description" />
                    <div className="mb-3">
                        <label>Tags</label>
                        <RMSelect
                            className="mt-1"
                            name="tags"
                            isMulti
                            options={tags}
                            onChange={(selected: MultiValue<SelectOption>) => setMultiSelectValue(selected)}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <DatePicker required name="start_date" label="Start Date" />
                        <DatePicker required name="end_date" label="Due Date" />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <button type="button" onClick={closeModal} className="btn border-2 border-emerald-500 text-emerald-500">Cancel</button>
                        <button type="submit" className="btn border-2 border-emerald-500 bg-emerald-500 text-white hover:bg-emerald-600 ">Save</button>
                    </div>
                </form>
            </Loading>
        </div>
    )
}

export default AddNewTaskForm

