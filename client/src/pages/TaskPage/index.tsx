import { useAppContext } from "../../contexts"
import Modal from "../../components/Modal"
import AddNewTaskForm from "./AddNewTaskForm"

function TaskPage() {
  const { openModal } = useAppContext()

  return (
    <div>
      <button onClick={openModal}>show modal</button>
      <Modal title="Add New Task">
        <AddNewTaskForm />
      </Modal>
    </div>
  )
}

export default TaskPage