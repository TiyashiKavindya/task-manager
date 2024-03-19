import Modal from '../components/Modal'
import { useAppContext } from '../contexts'
import Header from '../components/Header'
import { IoIosAddCircleOutline } from 'react-icons/io'

function ActivityPage() {
  const { openModal, closeModal } = useAppContext()

  return (
    <div>
      <Header title="Task" actionButtonText="Activity" actionButtonClassName="bg-sky-500 text-white hover:bg-sky-600" actionButtonIcon={<IoIosAddCircleOutline />} onActionButtonClick={openModal} />
      <Modal title="Add New Activity">
        <h1>Second modal</h1>
        <button onClick={closeModal} className="btn border-2 border-emerald-500 text-emerald-500">Cancel</button>
      </Modal>
    </div>
  )
}

export default ActivityPage