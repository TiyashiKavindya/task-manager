import { useState, useEffect } from "react"
import axios from "axios"
import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
import { API_BASE_URL, AXIOS_METHODS } from "../constants";

// type configObjType = {
//     method: string;
//     url: string;
//     requestConfig?: AxiosRequestConfig;
// }

// type UseAxiosReturnType = {
//     [Symbol.iterator]: () => IterableIterator<(configObj: configObjType) => void>;
// }

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
})

const useAxios = () => {
    const [response, setResponse] = useState<AxiosResponse>()
    const [error, setError] = useState<AxiosError>()
    const [loading, setLoading] = useState<boolean>(false)
    const [controller, setController] = useState<AbortController>()

    const axiosFetch = async (configObj: { method: string, url: string, requestConfig: AxiosRequestConfig }): Promise<void> => {
        const { method, url, requestConfig = {} } = configObj

        try {
            setLoading(true)
            const ctrl = new AbortController()
            setController(ctrl)
            let res: AxiosResponse;
            if (method.toLowerCase() === AXIOS_METHODS.GET) {
                res = await axiosInstance.get(url, { ...requestConfig, signal: ctrl.signal });
            } else if (method.toLowerCase() === AXIOS_METHODS.POST) {
                res = await axiosInstance.post(url, { ...requestConfig, signal: ctrl.signal });
            } else if (method.toLowerCase() === AXIOS_METHODS.PUT) {
                res = await axiosInstance.put(url, { ...requestConfig, signal: ctrl.signal });
            } else if (method.toLowerCase() === AXIOS_METHODS.DELETE) {
                res = await axiosInstance.delete(url, { ...requestConfig, signal: ctrl.signal });
            } else {
                throw new Error(`Invalid HTTP method: ${method}`);
            }
            setResponse(res.data as AxiosResponse)
        } catch (err) {
            setError(err as AxiosError)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        console.log(controller)
        return () => controller && controller.abort()
    }, [controller])

    return [response, error, loading, axiosFetch]
}

export default useAxios