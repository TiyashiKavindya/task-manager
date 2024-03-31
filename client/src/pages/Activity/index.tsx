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
import ActivityCard from '../../components/ActivityCard'

function ActivityPage() {
  const { openModal, loading, stopLoading } = useAppContext()
  const { statuses } = useDataContext()

  const [activities, setActivities] = useState([])
  const [filterdActivities, setFilterdActivities] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')

  const refetch = useCallback(async () => {
    try {
      const res = await getActivities()
      setActivities(res.data)
    } catch (err) {
      console.log(err);
    }
  }, [])

  useEffect(() => {
    const getAllTask = async () => {
      try {
        loading()
        await refetch()
        stopLoading()
      } catch (err) {
        console.log(err);
        stopLoading(err)
      }
    }
    getAllTask()
  }, [])

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilterdActivities(activities)
    } else {
      const filtered = activities.filter((task: any) => task.status_title === activeFilter)
      setFilterdActivities(filtered)
    }
  }, [activeFilter, activities])

  return (
    <>
      <Header title="Activities" actionButtonText="Activity" actionButtonClassName="bg-primary/90 text-white hover:bg-primary" actionButtonIcon={<IoIosAddCircleOutline />} onActionButtonClick={() => openModal(MODAL_NAMES.ADD_ACTIVITY)} />
      <Modal name={MODAL_NAMES.ADD_ACTIVITY} title="Add New Activity" className=''>
        <AddNewActivityForm refetch={refetch} />
      </Modal>
      <div className="flex min-h-10 gap-6 max-w-[275px] sm:max-w-[350px] md:max-w-[600px] lg:max-w-[1000px] xl:max-w-[1200px] overflow-x-scroll no-scrollbar">
        <button
          className={`mix-blend-normal border-b-2 pb-3 hover:text-primary hover:border-primary duration-300 ease-in-out text-nowrap ${activeFilter === 'All' ? 'text-primary border-primary' : 'border-transparent'}`}
          onClick={() => setActiveFilter('All')}
        >All</button>
        {
          statuses.length > 0 && statuses.map((status: any) => (
            <button key={status.id}
              className={`mix-blend-normal border-b-2 pb-3 hover:text-primary hover:border-primary duration-300 ease-in-out text-nowrap ${activeFilter === status.title ? 'text-primary border-primary' : 'border-transparent'}`}
              onClick={() => setActiveFilter(status.title)}
            >{status.title}</button>
          ))
        }
      </div >
      <Scrollable>
        <Loading>
          <div className="grid grid-cols-1 gap-4">
            {
              filterdActivities.length > 0 ? filterdActivities.map((task: any) => (
                <ActivityCard key={task.id} data={task}
                  refetch={refetch}
                />
              )) : <div className="text-center text-gray-400">No Activity</div>
            }
          </div>
        </Loading>
      </Scrollable>
    </>
  )
}

export default ActivityPage