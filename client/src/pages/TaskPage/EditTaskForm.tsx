import { FormEvent, useState } from "react"
import DatePicker from "../../components/DatePicker"
import InputField from "../../components/InputField"
import TextArea from "../../components/TextArea"
import Loading from "../../components/Loading"
import { useAppContext, useDataContext } from "../../contexts"
import { updateTasks } from "../../api"
import { convertDateFormat, makeAsOptions } from "../../utils"
import Select, { MultiValue } from 'react-select';
import { SelectOption } from "../../types"

type EditTaskFormProps = {
    defaultValues: any
    refetch: () => void
}

function EditTaskForm({ defaultValues, refetch }: EditTaskFormProps) {
    const { closeModal, toast } = useAppContext()
    const { tags, getTagsByIds } = useDataContext()

    const [selectedTags, setSelectedTags] = useState<MultiValue<SelectOption>>([])

    const handleUpdate = async (e: FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.currentTarget))
        const tags = selectedTags.map(o => o.value)
        try {
            const res = await updateTasks(id, { ...formData, tags })
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

    if (defaultValues) {
        return (
            <div className="px-1 max-h-[80dvh] overflow-y-auto md:w-[700px]">
                <Loading>
                    <form onSubmit={(e) => handleUpdate(e, defaultValues.id)} className="flex flex-col gap-2">
                        <InputField required label="Title" placeholder="Enter the title of the task" name="name" defaultValue={defaultValues.name} />
                        <TextArea required rows={4} label="Description" name="content" placeholder="Enter a detailed description" defaultValue={defaultValues.content} />
                        <div className="">
                            <label>Tags</label>
                            <Select
                                className="mt-1"
                                defaultValue={makeAsOptions(getTagsByIds(defaultValues.tags), 'name', 'id')}
                                isMulti
                                options={makeAsOptions(tags, 'name', 'id')}
                                onChange={(selected: MultiValue<SelectOption>) => setSelectedTags(selected)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <DatePicker required name="start_date" label="Start Date" defaultValue={convertDateFormat(defaultValues.start_date)} />
                            <DatePicker required name="end_date" label="Due Date" defaultValue={convertDateFormat(defaultValues.end_date)} />
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

