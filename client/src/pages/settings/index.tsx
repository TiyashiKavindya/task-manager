import { IoIosAddCircleOutline } from "react-icons/io"
import Header from "../../components/Header"
import Loading from "../../components/Loading"
import Scrollable from "../../components/Scrollable"
import { useEffect, useState } from "react"
import { getActivityTypes, getStatus, getTags } from "../../api"
import { useAppContext } from "../../contexts"
import { IoClose } from "react-icons/io5"
import Modal from "../../components/Modal"
import { MODAL_NAMES } from "../../constants"
import AddStatusFrom from "./AddStatusFrom"
import AddTagFrom from "./AddTagFrom"
import AddActivityTypeFrom from "./AddActivityTypeFrom"

function Settings() {
  const { loading, stopLoading, openModal } = useAppContext()
  const [tags, setTags] = useState([])
  const [statuses, setStatuses] = useState([])
  const [activityTypes, setActivityTypes] = useState([])

  const getTagsStatusActivityTypes = async () => {
    try {
      const tags = await getTags()
      const statuses = await getStatus()
      const activityTypes = await getActivityTypes()
      setTags(tags.data)
      setStatuses(statuses.data)
      setActivityTypes(activityTypes.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        loading()
        await getTagsStatusActivityTypes()
        stopLoading()
      } catch (error) {
        stopLoading(error)
      }
    }
    getData()
  }, [])

  const Badge = ({ name, style }: { name: string, style?: string }) => {

    return (
      <div className="relative ">
        <button className="absolute -top-3 -left-3 rounded-full w-6 h-6 flex items-center justify-center text-white bg-rose-600 hover:bg-red-500 shd duration-200 ease-in-out"><IoClose /></button>
        <div className="text-white px-4 py-1 rounded-full" style={{
          backgroundColor: style || undefined,
          border: style ? undefined : '1px solid #fff',
        }}>{name}</div>
      </div>
    )
  }

  return (
    <>
      <Header title="Settings" />
      <Loading>
        <Modal name={MODAL_NAMES.ADD_STATUS} title="Add New Status">
          <AddStatusFrom />
        </Modal>
        <Modal name={MODAL_NAMES.ADD_TAG} title="Add New Tag">
          <AddTagFrom />
        </Modal>
        <Modal name={MODAL_NAMES.ADD_ACTIVITY_TYPE} title="Add New Activity Type">
          <AddActivityTypeFrom />
        </Modal>
        <Scrollable>
          <div className="h-fit w-full mb-6 rounded-md p-6 bg-dark-light shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Status</p>
                <p className="text-sm text-gray-400">Add or remove status</p>
              </div>
              <button
                className="px-3 py-1 rounded-lg bg-primary/90 hover:bg-primary duration-200 ease-in-out flex items-center gap-1"
                onClick={() => openModal(MODAL_NAMES.ADD_STATUS)}
              ><IoIosAddCircleOutline /> Add New</button>
            </div>
            <div className="flex gap-6 flex-wrap my-10 mx-6">
              {
                statuses.map((status: any) => (
                  <Badge key={status.id} name={status.title} style={status.style} />
                ))
              }
            </div>
          </div>

          <div className="h-fit w-full mb-6 rounded-md p-6 bg-dark-light shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Tags</p>
                <p className="text-sm text-gray-400">Add or remove Tags</p>
              </div>
              <button
                className="px-3 py-1 rounded-lg bg-primary/90 hover:bg-primary duration-200 ease-in-out flex items-center gap-1"
                onClick={() => openModal(MODAL_NAMES.ADD_TAG)}
              ><IoIosAddCircleOutline /> Add New</button>
            </div>
            <div className="flex gap-6 flex-wrap my-10 mx-6">
              {
                tags.map((tag: any) => (
                  <Badge key={tag.id} name={tag.name} style={tag.color} />
                ))
              }
            </div>
          </div>

          <div className="h-fit w-full mb-6 rounded-md p-6 bg-dark-light shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Activity Types</p>
                <p className="text-sm text-gray-400">Add or remove Activity Types</p>
              </div>
              <button
                className="px-3 py-1 rounded-lg bg-primary/90 hover:bg-primary duration-200 ease-in-out flex items-center gap-1"
                onClick={() => openModal(MODAL_NAMES.ADD_ACTIVITY_TYPE)}
              ><IoIosAddCircleOutline /> Add New</button>
            </div>
            <div className="flex gap-6 flex-wrap my-10 mx-6">
              {
                activityTypes.map((activityType: any) => (
                  <Badge key={activityType.id} name={activityType.name} />
                ))
              }
            </div>
          </div>

        </Scrollable>
      </Loading>
    </>
  )
}

export default Settings