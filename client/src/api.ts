import axios from "./axios"

export const getSelectOptions = async () => {
    const tags = await axios.get('/tag')
    const statuses = await axios.get('/status')
    return {
        tags: tags.data,
        statuses: statuses.data
    }
}