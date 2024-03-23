import Modal from '../../components/Modal'
import { useAppContext, useDataContext } from '../../contexts'
import Header from '../../components/Header'
import { IoIosAddCircleOutline } from 'react-icons/io'
import AddNewActivityForm from './AddNewActivityForm'
import { MODAL_NAMES } from '../../constants'
import Scrollable from '../../components/Scrollable'
import Loading from '../../components/Loading'
import { getActivities } from '../../api'
import { useCallback, useEffect, useState } from 'react'
import Card from '../../components/Card'

function ActivityPage() {
  const { openModal, loading, stopLoading, confirm } = useAppContext()
  const { statuses } = useDataContext()

  const [activities, setActivities] = useState([])
  const [filterdActivities, setFilterdActivities] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')

  const refetch = useCallback(async () => {
    try {
      const res = await getActivities('all')
      setActivities(res.data)
    } catch (err) {
      console.log(err);
    }
  }, [])

  useEffect(() => {
    const getAllTask = async () => {
      try {
        loading()
        console.log("refetching");
        await refetch()
        console.log("refetched");
        stopLoading()
      } catch (err) {
        console.log(err);
      }
    }
    getAllTask()
  }, [])

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilterdActivities(activities)
    } else {
      const filtered = activities.filter((task: any) => task.status.title === activeFilter)
      setFilterdActivities(filtered)
    }
  }, [activeFilter, activities])

  return (
    <>
      <Header title="Activity" actionButtonText="Activity" actionButtonClassName="bg-sky-500 text-white hover:bg-sky-600" actionButtonIcon={<IoIosAddCircleOutline />} onActionButtonClick={() => openModal(MODAL_NAMES.ADD_ACTIVITY)} />
      <Modal name={MODAL_NAMES.ADD_ACTIVITY} title="Add New Activity" className=''>
        <AddNewActivityForm refetch={() => { }} />
      </Modal>
      <div className="flex border-b min-h-10 gap-6 max-w-[275px] sm:max-w-[350px] md:max-w-[600px] lg:max-w-[1000px] xl:max-w-[1200px] overflow-x-scroll no-scrollbar">
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
      <Scrollable>
        <Loading>
          <div className="grid grid-cols-1 gap-4">
            {filterdActivities.map((task: any) => (
              <Card
                key={task.id} data={task}
                onDeleteAction={() => {
                  confirm(
                    'Are you sure you want to delete this task?',
                    'This action cannot be undone.',
                    'Yes', () => { },
                    'No'
                  )
                }}
                onEditAction={() => { }}
              // refetch={refetch}
              />
            ))}
          </div>
        </Loading>
      </Scrollable>
    </>
  )
}

export default ActivityPage