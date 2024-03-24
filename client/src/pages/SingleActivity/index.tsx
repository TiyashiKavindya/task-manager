import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { useParams } from 'react-router-dom'
import { useAppContext, useDataContext } from '../../contexts'
import { getActivity } from '../../api'
import Scrollable from '../../components/Scrollable'
import { convertDateFormat } from '../../utils'
import Tag from '../../components/Tag'
import Loading from '../../components/Loading'
import LoadingEl from '../../components/LoadingEl'

function SingleActiviy() {
    const { id } = useParams()
    const { loading, stopLoading } = useAppContext()
    const { getTagInfoById } = useDataContext()

    const [activity, setActivity] = useState<any>()

    const refetch = async (id: number) => {
        try {
            const result = await getActivity(id)
            setActivity(result.data[0])
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                loading()
                if (!id) {
                    stopLoading({ message: 'Invalid activity id' })
                    return
                }
                refetch(parseInt(id))
                stopLoading()
            } catch (error) {
                console.error(error)
                stopLoading(error)
            }
        }
        getData()
    }, [])

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

    if (!activity) return <LoadingEl></LoadingEl>

    return (
        <>
            <Header title={`Activity`} actionButtonText="Activity" actionButtonClassName="bg-sky-500 text-white hover:bg-sky-600" actionButtonIcon={<IoIosAddCircleOutline />} onActionButtonClick={() => { }} />
            <Scrollable>
                <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                    <div className="">
                        <h1 className="flex-grow text-center md:text-left text-xl font-bold line-clamp-2 text-ellipsis mb-1">{activity.title}</h1>
                        <div className="flex gap-4 items-center justify-center md:justify-start">{dateEl(activity.start_date, activity.end_date)} <p className="text-sm px-2 py-1 border-2 rounded-full">{activity.activity_type} </p></div>
                    </div>
                    <div className="flex items-center md:items-start flex-col gap-1">
                        <p className="text-xs text-gray-500">Assigned tasks</p>
                        <h1>0 Tasks</h1>
                    </div>
                </div>
                {
                    activity.tags ?
                        <div className="flex flex-wrap gap-2">
                            {activity.tags.map((id: number) => {
                                const tag = getTagInfoById(id)
                                return tag && <Tag key={tag.id} text={tag.name} color={tag.color} />
                            })}
                        </div>
                        : <></>
                }
                <div className="flex-grow overflow-y-auto no-scrollbar">
                    <p className="text-md text-gray-500">{activity.description} </p>
                </div>
                <div className="">
                    {
                        activity.url ? <>
                            <p className="text-sm text-gray-500">Related Link: <a href={activity.url} target="_blank" className="text-sm text-ellipsis text-blue-500">{activity.url} </a></p>

                        </> : <></>
                    }
                </div>
            </Scrollable>
        </>
    )
}

export default SingleActiviy