import { useAppContext } from "../../contexts"
import Modal from "../../components/Modal"
import AddNewTaskForm from "./AddNewTaskForm"
import { IoIosAddCircleOutline } from "react-icons/io";
import Header from "../../components/Header";

function TaskPage() {
  const { openModal } = useAppContext()

  return (
    <div>
      <Header title="Task" actionButtonText="Task" actionButtonClassName="bg-emerald-500 text-white hover:bg-emerald-600" actionButtonIcon={<IoIosAddCircleOutline />} onActionButtonClick={openModal} />
      <Modal title="Add New Task">
        <AddNewTaskForm />
      </Modal>

    </div>
  )
}

export default TaskPage