import { useAppContext } from "../../contexts"
import Modal from "../../components/Modal"
import AddNewTaskForm from "./AddNewTaskForm"
import { IoIosAddCircleOutline } from "react-icons/io";
import Header from "../../components/Header";
import { deleteTaskById, getTasks } from "../../api";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Scrollable from "../../components/Scrollable";
import Card from "../../components/Card";
import { MdAdd } from "react-icons/md";

function TaskPage() {
  const { openModal, loading, stopLoading } = useAppContext()

  const [tasks, setTasks] = useState([])

  const getAllTask = async () => {
    try {
      loading()
      const res = await getTasks()
      setTasks(res.data)
      stopLoading()
    } catch (err) {
      stopLoading(err)
    }
  }

  const deleteTask = async (id: number) => {
    try {
      await deleteTaskById(id)
      getAllTask()
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllTask()
  }, [])

  return (
    <>
      <Header title="Task" actionButtonText="Task" actionButtonClassName="bg-emerald-500 text-white hover:bg-emerald-600" actionButtonIcon={<IoIosAddCircleOutline />} onActionButtonClick={openModal} />
      <Modal title="Add New Task">
        <AddNewTaskForm />
      </Modal>
      <Scrollable>
        <Loading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task: any) => (
              <Card
                key={task.id} data={task}
                onDeleteAction={(id: number) => {
                  deleteTask(id)
                }} />
            ))}
            <button onClick={openModal} type="button" className=" h-64 p-4 rounded-lg border-2 border-gray-300 border-dashed flex justify-center items-center gap-4 cursor-pointer hover:bg-white duration-300 ease-in-out">
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