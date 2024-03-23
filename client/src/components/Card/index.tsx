import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Tag from "../Tag";
import { updateStatus } from "../../api";
import DropDown from "../DropDown";
import { useAppContext, useDataContext } from "../../contexts";
import { convertDateFormat, makeAsOptions } from "../../utils";

type CardProps = {
    data: any
    onEditAction: (id: number) => void
    onDeleteAction: (id: number) => void
    refetch?: () => void
}

function Card({ data, onEditAction, onDeleteAction, refetch }: CardProps) {
    const { toast } = useAppContext()
    const { statuses, getTagInfoById } = useDataContext()

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

    return (
        <div className="bg-white h-80 p-4 rounded-lg border flex flex-col justify-between gap-3" style={{ borderColor: data.status_style }}>
            <div className="">
                <h1 className="text-lg font-bold line-clamp-2 text-ellipsis">{data.name}</h1>
                <p className="text-sm text-gray-500">{convertDateFormat(data.start_date, '/')} to {convertDateFormat(data.end_date, '/')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
                {
                    data.tags ? data.tags.map((id: number) => {
                        const tag = getTagInfoById(id)
                        return tag ? <Tag key={tag.id} text={tag.name} color={tag.color} /> : <></>
                    }) : <></>
                }
            </div>
            <div className="flex-grow overflow-y-auto no-scrollbar">
                <p className="text-sm text-ellipsis text-gray-500">{data.content} </p>
            </div>
            <div className="flex justify-between items-center">
                <DropDown options={makeAsOptions(statuses, 'title', 'id')} onChange={(value) => handleUpdateStatus(data.id, value)}>
                    <div className="px-3 py-2 rounded-md text-white" style={{ backgroundColor: data.status_style }}>{data.status_title}</div>
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