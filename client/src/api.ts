import axios from "./axios"

export const getSelectOptions = async () => {
    const tags = await axios.get('/tag')
    const statuses = await axios.get('/status')
    return {
        tags: tags.data,
        statuses: statuses.data
    }
}

export const saveTasks = async (data: any) => {
    return await axios.post('/task', data)
}

export const getTasks = async () => {
    return await axios.get('/task')
}

export const deleteTaskById = async (id: number) => {
    return await axios.delete(`/task/${id}`)
}

export const getStatus = async () => {
    return await axios.get('/status')
}

export const getTags = async () => {
    return await axios.get('/tag')
}

export const updateStatus = async (id: number, status: number | string) => {
    return await axios.patch(`/task/update_status/${id}`, { status })
}

export const updateTasks = async (id: number, data: any) => {
    return await axios.patch(`/task/${id}`, data)
}

export const getActivityTypes = async () => {
    return await axios.get('/activity_type')
}

export const saveActivity = async (data: any) => {
    return await axios.post('/activity', data)
}

export const getActivities = async () => {
    return await axios.get('/activity')
}

export const getActivity = async (id: number) => {
    return await axios.get(`/activity/${id}`)
}

export const getTaskByActivityId = async (id: number) => {
    return await axios.get(`/task/activity/${id}`)
}

export const getActivitySelectOptions = async () => {
    return await axios.get(`/activity/name_and_id_only`)
}

export const deleteActivityById = async (id: number) => {
    return await axios.delete(`/activity/${id}`)
}

export const updateActivityStatus = async (id: number, status: number | string) => {
    return await axios.patch(`/activity/update_status/${id}`, { status })
}

export const updateActivity = async (id: number, data: any) => {
    return await axios.patch(`/activity/${id}`, data)
}

export const getTodayTasks = async () => {
    return await axios.get('/task/today')
}

export const getThisWeekTaskCount = async () => {
    return await axios.get('/task/thisWeekTaskCount')
}

export const getTaskCountPreDay = async () => {
    return await axios.get('/task/taskCountPreDay')
}

export const getThisMonthActivity = async () => {
    return await axios.get('/task/thisMonthActivityStats')
}

export const getThisMonthActivityByStatus = async () => {
    return await axios.get('/activity/thisMonthActivityByStatus')
}

export const getThisMonthTask = async () => {
    return await axios.get('/task/thisMonthTaskStats')
}