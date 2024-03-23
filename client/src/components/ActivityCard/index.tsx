import Tag from "../Tag";
import { updateStatus } from "../../api";
import DropDown from "../DropDown";
import { useAppContext, useDataContext } from "../../contexts";
import { convertDateFormat, makeAsOptions } from "../../utils";
import { MdNavigateNext, MdOutlineChangeCircle } from "react-icons/md";
import { Link } from "react-router-dom";

type TaskCardProps = {
    data: any
    refetch?: () => void
}

function TaskCard({ data, refetch }: TaskCardProps) {
    const { toast } = useAppContext()
    const { statuses, getTagInfoById } = useDataContext()
    console.log(data);

    const handleUpdateStatus = async (id: number, value: number | string) => {
        try {
            const res = await updateStatus(id, value)
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

    const dateEl = (start_date: string, end_date: string) => {
        if (start_date && end_date) {
            return (
                <p className="text-sm text-center md:text-left text-gray-500">{convertDateFormat(start_date, '/')} to {convertDateFormat(end_date, '/')}</p>
            )
        } else if (start_date) {
            return (
                <p className="text-sm text-center md:text-left text-gray-500">{convertDateFormat(start_date, '/')}</p>
            )
        } else if (end_date) {
            return (
                <p className="text-sm text-center md:text-left text-gray-500">{convertDateFormat(end_date, '/')}</p>
            )
        }
    }

    return (
        <div className="bg-white h-56 md:h-40 p-4 rounded-lg border border-gray-500 flex flex-col justify-between gap-3">
            <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                <div className="">
                    <h1 className="flex-grow text-center md:text-left text-xl font-bold line-clamp-2 text-ellipsis mb-1">{data.title}</h1>
                    <div className="flex gap-4 items-center justify-center md:justify-start">{dateEl(data.start_date, data.end_date)} <p className="text-sm px-2 py-1 border-2 rounded-full">{data.activity_type} </p></div>
                </div>
                <div className="flex items-center md:items-start flex-col gap-1">
                    <p className="text-xs text-gray-500">Assigned tasks</p>
                    <h1>0 Tasks</h1>
                </div>
            </div>
            {/* {
                data.tags ?
                    <div className="flex flex-wrap gap-2">
                        {data.tags.map((id: number) => {
                            const tag = getTagInfoById(id)
                            return tag && <Tag key={tag.id} text={tag.name} color={tag.color} />
                        })}
                    </div>
                    : <></>
            } */}
            {/* <div className="flex-grow overflow-y-auto no-scrollbar">
                <p className="text-sm line-clamp-1 text-ellipsis text-gray-500">{data.description} </p>
            </div> */}
            {/* <div className="">
                {
                    data.url ? <>
                        <p className="text-sm text-gray-500">Related Link: <a href={data.url} target="_blank" className="text-sm text-ellipsis text-blue-500">{data.url} </a></p>
                        
                    </> : <></>
                }
            </div> */}
            <div className="flex justify-between items-center">

                <DropDown options={makeAsOptions(statuses, 'title', 'id')} onChange={(value) => handleUpdateStatus(data.id, value)}>
                    <div className=" w-36  flex items-center justify-between border-2 rounded-full" style={{ backgroundColor: data.status_style }} >
                        <div className="h-8 w-8 text-md rounded-full flex justify-center items-center bg-white" style={{ color: data.status_style }}>
                            <MdOutlineChangeCircle className="" />
                        </div>
                        <p className="pr-4 text-md text-white">{data.status_title}</p>
                    </div>
                </DropDown>
                <Link to={`/activity/${data.id}`} className="px-2 py-2 rounded-lg text-sm border text-center  bg-gray-900 text-white flex items-center justify-center gap-3">
                    <p className="pl-1">View More</p>
                    <MdNavigateNext className="text-xl" />
                </Link>
            </div>
        </div>
    )
}

export default TaskCard