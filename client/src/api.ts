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