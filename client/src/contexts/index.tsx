/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect, useState } from "react"
import { createContext } from "react";


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

    const [showModal, setShowModal] = useState<boolean>(false)
    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const loading = () => setIsLoading(true)
    const stopLoading = (err: any = null) => {
        if (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }

    return (
        <Context.Provider value={{
            showSidebar,
            openSidebar,
            closeSidebar,
            showModal,
            openModal,
            closeModal,
            isLoading,
            loading,
            stopLoading,
            error
        }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider