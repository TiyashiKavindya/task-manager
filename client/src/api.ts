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