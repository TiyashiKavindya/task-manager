/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect, useState } from "react"
import { createContext } from "react";
import { TOAST_TIMEOUT } from "../constants";


type ContextProviderProps = {
    children: React.ReactNode
}

export const Context = createContext<any>({});

export const useAppContext = () => {
    const store = useContext(Context)
    if (!store) {
        throw new Error('useAppContext must be used within a AppContextProvider')
    }
    return store
}

function ContextProvider({ children }: ContextProviderProps) {

    const [showSidebar, setShowSidebar] = useState<boolean>(window.innerWidth > 768)
    const openSidebar = () => {
        if (window.innerWidth < 768) setShowSidebar(true)
    }
    const closeSidebar = () => {
        if (window.innerWidth < 768) setShowSidebar(false)
    }
    const sidebarResize = () => {
        if (window.innerWidth < 768) {
            setShowSidebar(false)
        } else {
            setShowSidebar(true)
        }
    }
    useEffect(() => {
        window.addEventListener('resize', sidebarResize)
        return () => {
            window.removeEventListener('resize', sidebarResize)
        }
    }, [])

    const [modals, setModals] = useState<any>({})
    const resetModals = () => {
        for (const key in modals) modals[key] = false
    }
    const openModal = (name: string) => {
        resetModals()
        setModals({ ...modals, [name]: true })
    }
    const closeModal = () => {
        resetModals()
        setModals({ ...modals })
    }

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const loading = () => setIsLoading(true)
    const stopLoading = (err: any = null) => {
        if (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }

    const [showToast, setShowToast] = useState<boolean>(false)
    const [toastMsg, setToastMsg] = useState({ title: '', message: '', type: '' })
    const toast = {
        success: (title: string, message: string = '') => {
            setShowToast(true)
            setToastMsg({ title, message, type: 'success' })
            setTimeout(() => setShowToast(false), TOAST_TIMEOUT)
            setTimeout(() => setToastMsg({ title: '', message: '', type: '' }), TOAST_TIMEOUT + 300)
        },
        error: (title: string, message: string = '') => {
            setShowToast(true)
            setToastMsg({ title, message, type: 'error' })
            setTimeout(() => setShowToast(false), TOAST_TIMEOUT)
            setTimeout(() => setToastMsg({ title: '', message: '', type: '' }), TOAST_TIMEOUT + 300)
        }
    }

    return (
        <Context.Provider value={{
            showSidebar,
            openSidebar,
            closeSidebar,
            modals,
            openModal,
            closeModal,
            isLoading,
            loading,
            stopLoading,
            error,
            showToast,
            toastMsg,
            toast
        }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider