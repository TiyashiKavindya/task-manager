import { FormEvent, useEffect, useState } from "react"
import DatePicker from "../../components/DatePicker"
import InputField from "../../components/InputField"
import TextArea from "../../components/TextArea"
import Loading from "../../components/Loading"
import { useAppContext, useDataContext } from "../../contexts"
import { SelectOption } from "../../types"
import { getActivitySelectOptions, saveTasks } from "../../api"
import ReactSelect from 'react-select'
import { MultiValue } from 'react-select'
import { makeAsOptions } from "../../utils"

type AddNewTaskFormProps = {
    refetch: () => void
    activityId?: number | string
}

function AddNewTaskForm({ refetch, activityId }: AddNewTaskFormProps) {
    const { closeModal, toast } = useAppContext()
    const { statuses, tags } = useDataContext()

    const [multiSelectValue, setMultiSelectValue] = useState<MultiValue<SelectOption>>([])
    const [activitySelectOptions, setActivitySelectOptions] = useState<SelectOption[]>([])

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.currentTarget))
        const tags = multiSelectValue.map(o => o.value)
        if (!formData.activity_id) {
            formData['activity_id'] = activityId as FormDataEntryValue
        }
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

    const loadActivitySelectOptions = async () => {
        try {
            const res = await getActivitySelectOptions()
            setActivitySelectOptions(res.data.map((o: any) => ({ value: o.id, label: o.title })))
        } catch (err) {
            console.log(err)
            setActivitySelectOptions([])
        }
    }

    useEffect(() => {
        loadActivitySelectOptions()
    }, [])

    return (
        <div className="px-1 max-h-[80dvh] overflow-y-auto md:w-[700px]">
            <Loading>
                <form onSubmit={handleSave}>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <InputField required label="Title" placeholder="Enter the title of the task" name="name" />
                        <div className="w-full sm:w-36">
                            <label>Status</label>
                            <ReactSelect
                                required
                                className="mt-1 w-full"
                                name="status_id"
                                options={makeAsOptions(statuses, 'title', 'id')}
                            />
                        </div>
                    </div>
                    {
                        !activityId &&
                        <div className="my-3">
                            <label>Related Activity</label>
                            <ReactSelect
                                className="mt-1"
                                name="activity_id"
                                options={activitySelectOptions}
                            />
                        </div>
                    }
                    <TextArea required rows={4} label="Description" name="content" placeholder="Enter a detailed description" />
                    <div className="mb-3">
                        <label>Tags</label>
                        <ReactSelect
                            className="mt-1"
                            name="tags"
                            isMulti
                            options={makeAsOptions(tags, 'name', 'id')}
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

