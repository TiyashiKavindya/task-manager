import Modal from '../../components/Modal'
import { useAppContext } from '../../contexts'
import Header from '../../components/Header'
import { IoIosAddCircleOutline } from 'react-icons/io'
import AddNewActivityForm from './AddNewActivityForm'
import { MODAL_NAMES } from '../../constants'

function ActivityPage() {
  const { openModal } = useAppContext()

  return (
    <div>
      <Header title="Activity" actionButtonText="Activity" actionButtonClassName="bg-sky-500 text-white hover:bg-sky-600" actionButtonIcon={<IoIosAddCircleOutline />} onActionButtonClick={() => openModal(MODAL_NAMES.ADD_ACTIVITY)} />
      <Modal name={MODAL_NAMES.ADD_ACTIVITY} title="Add New Activity">
        <AddNewActivityForm refetch={() => { }} />
      </Modal>
    </div>
  )
}

export default ActivityPage