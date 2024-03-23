/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ContextProviderProps, Tag } from "../types";
import { getActivityTypes, getStatus, getTags } from "../api";

export const Context = createContext<any>({});

export const useDataContext = () => {
  const store = useContext(Context)
  if (!store) {
    throw new Error('useAppContext must be used within a AppContextProvider')
  }
  return store
}

function DataContextProvider({ children }: ContextProviderProps) {

  const [statuses, setStatuses] = useState([])
  const [tags, setTags] = useState([])
  const [activityTypes, setActivityTypes] = useState([])

  const updateStatuses = (statuses: any) => {
    if (statuses) setStatuses(statuses)
  }

  const updateTags = (tags: any) => {
    if (tags) setTags(tags)
  }

  const updateActivityTypes = (activityTypes: any) => {
    if (activityTypes) setActivityTypes(activityTypes)
  }

  const getIntitalData = useCallback(async () => {
    try {
      const statusesData = await getStatus()
      const tagsData = await getTags()
      const activityTypesData = await getActivityTypes()
      updateStatuses(statusesData.data)
      updateTags(tagsData.data)
      updateActivityTypes(activityTypesData.data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    getIntitalData()
  }, [])

  const getTagInfoById = (id: number) => {
    return tags.find((tag: Tag) => tag.id === id)
  }

  const getTagsByIds = (id: number[]) => {
    return tags.filter((tag: Tag) => id.includes(tag.id))
  }

  return (
    <Context.Provider value={{
      statuses,
      updateStatuses,
      tags,
      getTagInfoById,
      getTagsByIds,
      updateTags,
      activityTypes,
      updateActivityTypes
    }}>
      {children}
    </Context.Provider>
  )
}

export default DataContextProvider
