import axios from "./axios"
const abortController = new AbortController();
const { signal } = abortController;

export const abortRequest = () => {
    abortController.abort();
}

export const getSelectOptions = async () => {
    const tags = await axios.get('/tag')
    const statuses = await axios.get('/status')
    return {
        tags: tags.data,
        statuses: statuses.data
    }
}

export const saveTasks = async (data: any) => {
    return await axios.post('/task', data, { signal })
}

export const getTasks = async () => {
    return await axios.get('/task', { signal })
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

export const getActivities = async (t: string) => {
    console.log("activity:", t);
    return await axios.get('/activity')
}