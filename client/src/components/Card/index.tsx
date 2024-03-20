import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

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
        <div className="bg-white h-64 p-4 rounded-lg border-2 flex flex-col justify-between gap-3">
            <div className="flex-grow">
                <h1 className="text-lg font-bold">{data.name}</h1>
                <p className="text-sm line-clamp-6 text-ellipsis text-gray-500">{data.content}</p>
            </div>
            <div className="mt-4">
                <span className="px-2 py-1 text-xs">Start Date: {getDate(data.start_date)}</span>
                <span className="px-2 py-1 text-xs ml-2">Due Date: {getDate(data.end_date)}</span>
            </div>
            <div className="flex justify-between items-center">
                <button>{data.status_id}</button>
                <div className="flex gap-2 items-center">
                    <button onClick={handleEditAction} className="p-2 hover:bg-teal-500 hover:text-white duration-300 ease-in-out rounded-full"><AiOutlineEdit className="text-xl" /></button>
                    <button onClick={() => onDeleteAction(data.id)} className="p-2 hover:bg-rose-500 hover:text-white duration-300 ease-in-out rounded-full"><AiOutlineDelete className="text-xl" /></button>
                </div>
            </div>
        </div>
    )
}

export default Card