import { useAppContext } from "../../contexts"
import Modal from "../../components/Modal"
import AddNewTaskForm from "./AddNewTaskForm"
import { IoIosAddCircleOutline } from "react-icons/io";
import Header from "../../components/Header";
import { deleteTaskById, getStatus, getTasks } from "../../api";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Scrollable from "../../components/Scrollable";
import Card from "../../components/Card";
import { MdAdd } from "react-icons/md";
import { MODAL_NAMES } from "../../constants";
import EditTaskForm from "./EditTaskForm";

function TaskPage() {
  const { openModal, loading, stopLoading, toast, confirm } = useAppContext()

  const [tasks, setTasks] = useState([])
  const [filterdTasks, setFilterdTasks] = useState([])
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [statusList, setStatusList] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')

  const refetch = async () => {
    try {
      const res = await getTasks()
      setTasks(res.data)
    } catch (err) {
      console.log(err);
    }
  }

  const deleteTask = async (id: number) => {
    try {
      await deleteTaskById(id)
      refetch()
      toast('Task deleted', 'Task deleted successfully.')
    } catch (err) {
      console.log(err);
      toast('Delete Failed', 'Failed to delete task.')
    }
  }

  const getStatusList = async () => {
    try {
      const res = await getStatus()
      setStatusList(res.data)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const getAllTask = async () => {
      try {
        loading()
        await refetch()
      } catch (err) {
        console.log(err);
      } finally {
        stopLoading()
      }
    }
    getAllTask()
    getStatusList()
  }, [])

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilterdTasks(tasks)
    } else {
      const filteredTasks = tasks.filter((task: any) => task.status.title === activeFilter)
      setFilterdTasks(filteredTasks)
    }
  }, [activeFilter, tasks])

  return (
    <>
      <Header title="Task" actionButtonText="Task" actionButtonClassName="bg-emerald-500 text-white hover:bg-emerald-600" actionButtonIcon={<IoIosAddCircleOutline />} onActionButtonClick={() => openModal(MODAL_NAMES.ADD_TASK)} />
      <Modal name={MODAL_NAMES.ADD_TASK} title="Add New Task">
        <AddNewTaskForm refetch={refetch} />
      </Modal>
      <Modal name={MODAL_NAMES.EDIT_TASK} title="Edit Task">
        <EditTaskForm defaultValues={taskToEdit} refetch={refetch} />
      </Modal>
      <div className="flex border-b min-h-10 gap-6 max-w-[275px] sm:max-w-[350px] md:max-w-[600px] lg:max-w-[1000px] xl:max-w-[1200px] overflow-x-scroll no-scrollbar">
        <button
          className={`mix-blend-normal border-b-2 pb-3 hover:text-emerald-500 hover:border-emerald-500 duration-300 ease-in-out text-nowrap ${activeFilter === 'All' ? 'text-emerald-500 border-emerald-500' : 'border-transparent'}`}
          onClick={() => setActiveFilter('All')}
        >All</button>
        {
          statusList.length > 0 && statusList.map((status: any) => (
            <button key={status.id}
              className={`mix-blend-normal border-b-2 pb-3 hover:text-emerald-500 hover:border-emerald-500 duration-300 ease-in-out text-nowrap ${activeFilter === status.title ? 'text-emerald-500 border-emerald-500' : 'border-transparent'}`}
              onClick={() => setActiveFilter(status.title)}
            >{status.title}</button>
          ))
        }
      </div >
      <Scrollable>
        <Loading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterdTasks.map((task: any) => (
              <Card
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
            <button onClick={() => openModal(MODAL_NAMES.ADD_TASK)} type="button" className=" h-80 p-4 rounded-lg border-2 border-gray-300 border-dashed flex justify-center items-center gap-4 cursor-pointer hover:bg-white duration-300 ease-in-out">
              <MdAdd className="text-3xl" />
              <p className="">Add New Task</p>
            </button>
          </div>
        </Loading>
      </Scrollable>
    </>
  )
}

export default TaskPage