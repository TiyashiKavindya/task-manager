import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext, useDataContext } from '../../contexts'
import { deleteActivityById, deleteTaskById, getActivity, getTaskByActivityId } from '../../api'
import Scrollable from '../../components/Scrollable'
import { convertDateFormat } from '../../utils'
import Tag from '../../components/Tag'
import LoadingEl from '../../components/LoadingEl'
import TaskCard from '../../components/TaskCard'
import { MdAdd } from 'react-icons/md'
import { MODAL_NAMES } from '../../constants'
import Modal from '../../components/Modal'
import AddNewTaskForm from '../Task/AddNewTaskForm'
import EditTaskForm from '../Task/EditTaskForm'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import EditActivityForm from './EditActivityForm'

function SingleActiviy() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { loading, stopLoading, toast, confirm, openModal } = useAppContext()
    const { getTagInfoById, statuses } = useDataContext()

    const [activity, setActivity] = useState<any>()
    const [tasks, setTasks] = useState([])
    const [filterdTasks, setFilterdTasks] = useState([])
    const [taskToEdit, setTaskToEdit] = useState(null)
    const [activeFilter, setActiveFilter] = useState('All')

    const deleteActivity = async (id: number) => {
        try {
            await deleteActivityById(id)
            toast('Activity deleted', 'Activity deleted successfully.')
            navigate('/activity')
        } catch (err) {
            console.log(err);
            toast('Delete Failed', 'Failed to delete activity.')
        }
    }

    const deleteTask = async (id: number) => {
        try {
            await deleteTaskById(id)
            toast('Task deleted', 'Task deleted successfully.')
            refetch()
        } catch (err) {
            console.log(err);
            toast('Delete Failed', 'Failed to delete task.')
        }
    }

    const refetch = async () => {
        try {
            if (!id) {
                stopLoading({ message: 'Invalid activity id' })
                return
            }
            const result = await getActivity(parseInt(id))
            const tasks = await getTaskByActivityId(parseInt(id))
            setActivity(result.data[0])
            setTasks(tasks.data)
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
                refetch()
                stopLoading()
            } catch (error) {
                console.error(error)
                stopLoading(error)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        if (activeFilter === 'All') {
            setFilterdTasks(tasks)
        } else {
            const filteredTasks = tasks.filter((task: any) => task.status_title === activeFilter)
            setFilterdTasks(filteredTasks)
        }
    }, [activeFilter, tasks])

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
            <Header title={`Activity`} actionButtonText="Create New Task" actionButtonClassName="bg-sky-500 text-white hover:bg-sky-600" actionButtonIcon={<IoIosAddCircleOutline />} onActionButtonClick={() => { openModal(MODAL_NAMES.ADD_TASK) }} />
            <Modal name={MODAL_NAMES.ADD_TASK} title="Add New Task">
                <AddNewTaskForm activityId={id} refetch={refetch} />
            </Modal>
            <Modal name={MODAL_NAMES.EDIT_TASK} title="Edit Task">
                <EditTaskForm defaultValues={taskToEdit} refetch={refetch} />
            </Modal>
            <Modal name={MODAL_NAMES.EDIT_ACTIVITY} title="Edit Activity">
                <EditActivityForm data={activity} refetch={refetch} />
            </Modal>
            <Scrollable>
                <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                    <div className="">
                        <h1 className="flex-grow text-center md:text-left text-xl font-bold line-clamp-2 text-ellipsis mb-1">{activity.title}</h1>
                        <div className="flex gap-4 items-center justify-center md:justify-start">{dateEl(activity.start_date, activity.end_date)} <p className="text-sm px-2 py-1 border-2 rounded-full">{activity.activity_type} </p></div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => openModal(MODAL_NAMES.EDIT_ACTIVITY)} className="p-2 hover:bg-teal-500 hover:text-white duration-300 ease-in-out rounded-full flex items-center gap-3 px-4"><AiOutlineEdit className="text-xl" /> Edit</button>
                        <button onClick={() => {
                            confirm(
                                'Are you sure you want to delete this activity?',
                                'All task related to this activity will also be deleted. this action cannot be undone.',
                                'Yes', () => {
                                    deleteActivity(activity.id)
                                },
                                'No'
                            )

                        }} className="p-2 hover:bg-rose-500 hover:text-white duration-300 ease-in-out rounded-full flex items-center gap-3 px-4"><AiOutlineDelete className="text-xl" /> Delete</button>
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
                <div className="mt-6 py-2 flex justify-between items-center border-b">
                    <p>Related Tasks</p>
                    <div className="flex items-center md:items-start flex-col gap-1">
                        <p className="text-xs text-gray-500">Assigned tasks</p>
                        <h1>{tasks.length} Tasks</h1>
                    </div>
                </div>
                <div className="mt-6 flex border-b min-h-10 gap-6 max-w-[275px] sm:max-w-[350px] md:max-w-[600px] lg:max-w-[1000px] xl:max-w-[1200px] overflow-x-scroll no-scrollbar">
                    <button
                        className={`mix-blend-normal border-b-2 pb-3 hover:text-emerald-500 hover:border-emerald-500 duration-300 ease-in-out text-nowrap ${activeFilter === 'All' ? 'text-emerald-500 border-emerald-500' : 'border-transparent'}`}
                        onClick={() => setActiveFilter('All')}
                    >All</button>
                    {
                        statuses.length > 0 && statuses.map((status: any) => (
                            <button key={status.id}
                                className={`mix-blend-normal border-b-2 pb-3 hover:text-emerald-500 hover:border-emerald-500 duration-300 ease-in-out text-nowrap ${activeFilter === status.title ? 'text-emerald-500 border-emerald-500' : 'border-transparent'}`}
                                onClick={() => setActiveFilter(status.title)}
                            >{status.title}</button>
                        ))
                    }
                </div >
                <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filterdTasks.map((task: any) => (
                        <TaskCard
                            key={task.id} data={task}
                            onDeleteAction={() => {
                                confirm(
                                    'Are you sure you want to delete this task?',
                                    'This action cannot be undone.',
                                    'Yes', () => deleteTask(task.id),
                                    'No'
                                )
                            }}
                            onEditAction={() => {
                                setTaskToEdit(task)
                                openModal(MODAL_NAMES.EDIT_TASK)

                            }}
                            refetch={refetch}
                        />
                    ))}
                    <button onClick={() => { openModal(MODAL_NAMES.ADD_TASK) }} type="button" className=" h-80 p-4 rounded-lg border-2 border-gray-300 border-dashed flex justify-center items-center gap-4 cursor-pointer hover:bg-white duration-300 ease-in-out">
                        <MdAdd className="text-3xl" />
                        <p className="">Add New Task</p>
                    </button>
                </div>
            </Scrollable>
        </>
    )
}

export default SingleActiviy