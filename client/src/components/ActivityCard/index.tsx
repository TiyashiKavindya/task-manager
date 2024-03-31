import { updateActivityStatus } from "../../api";
import DropDown from "../DropDown";
import { useAppContext, useDataContext } from "../../contexts";
import { convertDateFormat, makeAsOptions } from "../../utils";
import { MdNavigateNext, MdOutlineChangeCircle } from "react-icons/md";
import { Link } from "react-router-dom";

type ActivityCardProps = {
    data: any
    refetch?: () => void
}

function ActivityCard({ data, refetch }: ActivityCardProps) {
    const { toast } = useAppContext()
    const { statuses } = useDataContext()

    const handleUpdateStatus = async (id: number, value: number | string) => {
        try {
            const res = await updateActivityStatus(id, value)
            if (res.data.success) {
                refetch && refetch()
                toast('Status Changed', 'Activity status updated successfully.')
            } else {
                toast('Status Change Failed 1', 'Activity status update failed. Please try again.')
            }
        } catch (err) {
            console.log(err)
            toast('Status Change Failed', 'Activity status update failed. Please try again.')
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
        <div className="bg-dark-light/90 hover:bg-dark-light h-52 md:h-44 py-6 px-6 rounded-lg  border border-dark/50 flex flex-col justify-between gap-3">
            <div>
                <h1 className="text-center md:text-left text-xl font-bold line-clamp-2 text-ellipsis mb-1">{data.title}</h1>
            </div>
            <div className="flex justify-start gap-2 md:gap-4">
                <div className="flex gap-4 items-center justify-center md:justify-start">
                    {dateEl(data.start_date, data.end_date)}
                </div>
                <p className="text-sm text-center px-2 py-1 border-2 rounded-full">{data.activity_type} </p>
            </div>

            <div className="flex justify-between items-center">

                <DropDown options={makeAsOptions(statuses, 'title', 'id')} onChange={(value) => handleUpdateStatus(data.id, value)}>
                    <div className=" w-36  flex items-center justify-between rounded-full" style={{ backgroundColor: data.status_style }} >
                        <div className="h-8 w-8 text-md rounded-full flex justify-center items-center bg-white" style={{ color: data.status_style }}>
                            <MdOutlineChangeCircle className="" />
                        </div>
                        <p className="pr-4 text-md text-white">{data.status_title}</p>
                    </div>
                </DropDown>
                <Link to={`/activity/${data.id}`} className="px-2 py-2 rounded-lg text-sm border text-center bg-light text-dark-light flex items-center justify-center gap-3">
                    <p className="pl-1">View More</p>
                    <MdNavigateNext className="text-xl" />
                </Link>
            </div>
        </div>
    )
}

export default ActivityCard