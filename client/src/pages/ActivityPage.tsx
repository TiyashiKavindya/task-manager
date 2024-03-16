import React from 'react'
import Modal from '../components/Modal'
import { useAppContext } from '../contexts'

function ActivityPage() {
  const { openModal, closeModal } = useAppContext()

  return (
    <div>
      <button onClick={openModal}>show modal</button>
      <Modal title="Add New Activity">
        <h1>Second modal</h1>
        <button onClick={closeModal} className="btn border-2 border-emerald-500 text-emerald-500">Cancel</button>
      </Modal>
    </div>
  )
}

export default ActivityPage