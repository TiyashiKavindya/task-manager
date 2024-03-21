import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Tag from "../Tag";
import { SelectOption } from "../../types";
import { useEffect, useState } from "react";
import { getStatus, updateStatus } from "../../api";
import DropDown from "../DropDown";
import { useAppContext } from "../../contexts";

type CardProps = {
    data: any
    onEditAction: (id: number) => void
    onDeleteAction: (id: number) => void
    refetch?: () => void
}

const getDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString()
}

function Card({ data, onEditAction, onDeleteAction, refetch }: CardProps) {
    const { toast } = useAppContext()
    const [statusSelectOptions, setStatusSelectOptions] = useState<SelectOption[]>([])

    const handleUpdateStatus = async (id: number, value: number | string) => {
        try {
            const res = await updateStatus(id, value)
            console.log(res.data);

            if (res.data.success) {
                refetch && refetch()
                toast('Status Changed', 'Task status updated successfully.')
            } else {
                toast('Status Change Failed 1', 'Task status update failed. Please try again.')
            }
        } catch (err) {
            console.log(err)
            toast('Status Change Failed', 'Task status update failed. Please try again.')
        }
    }

    const getTagSelectOptions = async () => {
        try {
            const res = await getStatus()
            const op = res.data.map((t: any) => ({ label: t.title, value: t.id }))
            setStatusSelectOptions(op)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getTagSelectOptions()
    }, [])

    return (
        <div className="bg-white h-80 p-4 rounded-lg border flex flex-col justify-between gap-3" style={{ borderColor: data.status.style }}>
            <div className="">
                <h1 className="text-lg font-bold">{data.name}</h1>
                <p className="text-sm text-gray-500">{getDate(data.start_date)} to {getDate(data.end_date)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
                {
                    data.tags ? data.tags.map((tag: any) => <Tag key={tag.id} text={tag.name} color={tag.color} />) : <></>
                }
            </div>
            <div className="flex-grow overflow-y-auto no-scrollbar">
                <p className="text-sm text-ellipsis text-gray-500">{data.content} </p>
            </div>
            <div className="flex justify-between items-center">
                <DropDown options={statusSelectOptions} onChange={(value) => handleUpdateStatus(data.id, value)}>
                    <div className="px-3 py-2 rounded-md text-white" style={{ backgroundColor: data.status.style }}>{data.status.title}</div>
                </DropDown>
                <div className="flex gap-2 items-center">
                    <button onClick={() => onEditAction(data.id)} className="p-2 hover:bg-teal-500 hover:text-white duration-300 ease-in-out rounded-full"><AiOutlineEdit className="text-xl" /></button>
                    <button onClick={() => onDeleteAction(data.id)} className="p-2 hover:bg-rose-500 hover:text-white duration-300 ease-in-out rounded-full"><AiOutlineDelete className="text-xl" /></button>
                </div>
            </div>
        </div>
    )
}

export default Card