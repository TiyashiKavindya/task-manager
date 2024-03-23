import { FormEvent, useEffect, useState } from "react"
import DatePicker from "../../components/DatePicker"
import InputField from "../../components/InputField"
import TextArea from "../../components/TextArea"
import Loading from "../../components/Loading"
import { useAppContext } from "../../contexts"
import { SelectOption } from "../../types"
import { getActivityTypes, getSelectOptions, saveActivity } from "../../api"
import RMSelect from 'react-select'
import { MultiValue } from 'react-select'


type AddNewActivityFormProps = {
    refetch: () => void
}

function AddNewActivityForm({ refetch }: AddNewActivityFormProps) {
    const { closeModal, toast } = useAppContext()
    const [tags, setTags] = useState<SelectOption[]>([])
    const [statuses, setstatuses] = useState<SelectOption[]>([])
    const [activityTypes, setactivityTypes] = useState<SelectOption[]>([])
    const [multiSelectValue, setMultiSelectValue] = useState<MultiValue<SelectOption>>([])

    const getFormDefaultValues = async () => {
        try {
            const res = await getSelectOptions()
            setTags(res.tags.map((tag: any) => ({ label: tag.name, value: tag.id })) as SelectOption[])
            setstatuses(res.statuses.map((status: any) => ({ label: status.title, value: status.id })) as SelectOption[])

            const activityTypes = await getActivityTypes()
            setactivityTypes(activityTypes.data.map((activityType: any) => ({ label: activityType.name, value: activityType.id })) as SelectOption[])
        } catch (err) {
            console.log(err)
        }
    }

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.currentTarget))
        const tags = multiSelectValue.map(o => o.value)
        console.log({ ...formData, tags });

        try {
            const res = await saveActivity({ ...formData, tags })
            if (res.data.success) {
                toast('Activity Created', 'Activity saved successfully')
                refetch()
            } else {
                toast('Activity Failed', 'Activity creation failed')
            }
        } catch (err: any) {
            console.log(err)
            toast('Activity Failed', err.message as string)
        } finally {
            closeModal()
            setMultiSelectValue([])
        }
    }

    useEffect(() => {
        getFormDefaultValues()
    }, [])

    return (
        <div className="px-1 max-h-[80dvh] overflow-y-auto md:w-[700px] lg:w-[800px]">
            <Loading>
                <form onSubmit={handleSave}>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <InputField required label="Title" placeholder="Enter the title of the task" name="title" />
                        <div className="w-full sm:w-36">
                            <label>Activity Type</label>
                            <RMSelect
                                required
                                className="mt-1 w-full"
                                name="activity_type_id"
                                options={activityTypes}
                                defaultValue={activityTypes[0]}
                            />
                        </div>
                        <div className="w-full sm:w-36">
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
                    <TextArea required rows={3} label="Description" name="description" placeholder="Enter a detailed description" />
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
                    <InputField label="Link (optional)" placeholder="Link to hobby/course page" name="url" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                        <DatePicker name="start_date" label="Start Date (optional)" />
                        <DatePicker name="end_date" label="Due Date (optional)" />
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

export default AddNewActivityForm

