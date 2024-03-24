import { FormEvent, useState } from "react"
import DatePicker from "../../components/DatePicker"
import InputField from "../../components/InputField"
import TextArea from "../../components/TextArea"
import Loading from "../../components/Loading"
import { useAppContext, useDataContext } from "../../contexts"
import { updateActivity } from "../../api"
import { convertDateFormat, makeAsOptions } from "../../utils"
import Select, { MultiValue } from 'react-select';
import { SelectOption } from "../../types"

type EditActivityFormProps = {
    refetch: () => void
    data: any
}

function EditActivityForm({ refetch, data }: EditActivityFormProps) {
    const { closeModal, toast } = useAppContext()
    const { tags, getTagsByIds } = useDataContext()

    const [selectedTags, setSelectedTags] = useState<MultiValue<SelectOption>>([])
    // const [activityTypesOptions, setActivityTypesOptions] = useState<MultiValue<SelectOption>>([])
    // useEffect(() => {
    //     setActivityTypesOptions(makeAsOptions(activityTypes, 'name', 'id'))
    // }, [activityTypes])

    const handleUpdate = async (e: FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.currentTarget))
        const tags = selectedTags.map(o => o.value)
        try {
            const res = await updateActivity(id, { ...formData, tags })
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

    return (
        <div className="px-1 max-h-[80dvh] overflow-y-auto md:w-[700px]">
            <Loading>
                <form onSubmit={(e) => handleUpdate(e, data.id)} className="flex flex-col gap-2">
                    <InputField required label="Title" placeholder="Enter the title of the task" name="title" defaultValue={data.title} />
                    {/* <div className="w-full">
                        <label>Activity Type</label>
                        <Select
                            required
                            className="mt-1 w-full"
                            name="activity_type_id"
                            options={activityTypesOptions}
                            defaultValue={activityTypesOptions[0]}
                        />
                    </div> */}
                    <TextArea required rows={4} label="Description" name="description" placeholder="Enter a detailed description" defaultValue={data.description} />
                    <div className="">
                        <label>Tags</label>
                        <Select
                            className="mt-1"
                            defaultValue={makeAsOptions(getTagsByIds(data.tags), 'name', 'id')}
                            isMulti
                            options={makeAsOptions(tags, 'name', 'id')}
                            onChange={(selected: MultiValue<SelectOption>) => setSelectedTags(selected)}
                        />
                    </div>
                    <InputField label="Link" placeholder="Link to hobby/course page" name="url" defaultValue={data.url} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <DatePicker name="start_date" label="Start Date" defaultValue={convertDateFormat(data.start_date)} />
                        <DatePicker name="end_date" label="Due Date" defaultValue={convertDateFormat(data.end_date)} />
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

export default EditActivityForm

