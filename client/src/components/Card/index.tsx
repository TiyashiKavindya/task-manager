import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Tag from "../Tag";

type CardProps = {
    data: any
    handleEditAction?: () => void
    onDeleteAction: (id: number) => void
}

const getDate = (date: string) => {
    const d = new Date(date)
    return d.toISOString().split('T')[0]
}

function Card({ data, handleEditAction, onDeleteAction }: CardProps) {
    return (
        <div className="bg-white h-80 p-4 rounded-lg border flex flex-col justify-between gap-3" style={{ borderColor: data.status.style }}>
            <div className="">
                <h1 className="text-lg font-bold">{data.name}</h1>
                <p className="text-sm text-gray-500">{getDate(data.end_date)} to {getDate(data.start_date)}</p>
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
                <button className="px-3 py-2 rounded-md text-white" style={{ backgroundColor: data.status.style }}>{data.status.title}</button>
                <div className="flex gap-2 items-center">
                    <button onClick={handleEditAction} className="p-2 hover:bg-teal-500 hover:text-white duration-300 ease-in-out rounded-full"><AiOutlineEdit className="text-xl" /></button>
                    <button onClick={() => onDeleteAction(data.id)} className="p-2 hover:bg-rose-500 hover:text-white duration-300 ease-in-out rounded-full"><AiOutlineDelete className="text-xl" /></button>
                </div>
            </div>
        </div>
    )
}

export default Card