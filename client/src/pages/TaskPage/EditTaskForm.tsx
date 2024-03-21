import { FormEvent, useEffect, useState } from "react"
import DatePicker from "../../components/DatePicker"
import InputField from "../../components/InputField"
import MultiSelect from "../../components/MultiSelect"
import Select from "../../components/Select"
import TextArea from "../../components/TextArea"
import Loading from "../../components/Loading"
import { useAppContext } from "../../contexts"
import { SelectOption } from "../../types"
import { getSelectOptions, updateTasks } from "../../api"

type EditTaskFormProps = {
    defaultValues: any
    refetch: () => void
}

const getDate = (date: string) => {
    const d = new Date(date)
    return d.toISOString().split('T')[0]
}

function EditTaskForm({ defaultValues, refetch }: EditTaskFormProps) {
    const { closeModal, toast } = useAppContext()
    const [tags, setTags] = useState<SelectOption[]>([])
    const [statuses, setstatuses] = useState<SelectOption[]>([])
    const [multiSelectValue, setMultiSelectValue] = useState<SelectOption[]>([])

    const getFormDefaultValues = async () => {
        try {
            const res = await getSelectOptions()
            setTags(res.tags.map((tag: any) => ({ label: tag.name, value: tag.id })) as SelectOption[])
            setstatuses(res.statuses.map((status: any) => ({ label: status.title, value: status.id })) as SelectOption[])
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = async (e: FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.currentTarget))
        try {
            const res = await updateTasks(id, formData)
            if (res.data.success) {
                toast('Task Updated', 'Task updated successfully')
                refetch()
            } else {
                toast('Task update Failed', 'Task update failed')
            }
        } catch (err: any) {
            console.log(err)
            toast('Task update Failed', err.message as string)
        } finally {
            closeModal()
        }
    }

    useEffect(() => {
        getFormDefaultValues()
    }, [])

    if (defaultValues) {
        return (
            <div className="overflow-y-auto px-1">
                <Loading>
                    <form onSubmit={(e) => handleUpdate(e, defaultValues.id)}>
                        <div className="flex gap-2">
                            <InputField label="Title" placeholder="Enter the title of the task" name="name" defaultValue={defaultValues.name} />
                            <Select className="w-28 text-sm md:text-base md:w-36" label="Status" name="status_id" options={statuses} defaultValue={defaultValues.status_id} />
                        </div>
                        <TextArea label="Description" name="content" placeholder="Enter a detailed description" defaultValue={defaultValues.content} />
                        <MultiSelect className="mb-3" label="Tags" value={multiSelectValue} onChange={o => setMultiSelectValue(o)} options={tags} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <DatePicker name="start_date" label="Start Date" defaultValue={getDate(defaultValues.start_date)} />
                            <DatePicker name="end_date" label="Due Date" defaultValue={getDate(defaultValues.end_date)} />
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
    return <></>

}

export default EditTaskForm

