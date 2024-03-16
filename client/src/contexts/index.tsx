import { useContext, useEffect, useState } from "react"
import { createContext } from "react";


type ContextProviderProps = {
    children: React.ReactNode
}

export const Context = createContext({
    showSidebar: true,
    openSidebar: () => { },
    closeSidebar: () => { },
    showModal: false,
    openModal: () => { },
    closeModal: () => { }
});

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

    return (
        <Context.Provider value={{
            showSidebar,
            openSidebar,
            closeSidebar,
            showModal,
            openModal,
            closeModal
        }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider