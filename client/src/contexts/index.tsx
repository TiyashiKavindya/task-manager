/* eslint-disable react-refresh/only-export-components */
import { ContextProviderProps } from "../types"
import AppContextProvider from "./appContext"
import DataContextProvider from "./dataContext"

function ContextProvider({ children }: ContextProviderProps) {
    return (
        <AppContextProvider>
            <DataContextProvider>
                {children}
            </DataContextProvider>
        </AppContextProvider>
    )
}

export default ContextProvider

export { useAppContext } from "./appContext"
export { useDataContext } from "./dataContext"