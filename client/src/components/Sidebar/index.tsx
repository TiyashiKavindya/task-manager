import { Link } from "react-router-dom"
import { AiOutlineClose } from "react-icons/ai"
import { ROUTES } from "../../routes"
import { useAppContext } from "../../contexts"

function Sidebar() {
    const { showSidebar, closeSidebar } = useAppContext()
    return (
        <>
            <div className={`fixed z-20 bottom-0 top-0 left-0 md:static min-w-[250px] w-[250px] duration-200 ease-in-out  bg-dark-light text-light shadow-md pl-6 pr-4 py-4 ${showSidebar ? 'translate-x-0' : 'translate-x-[-100%]'}`}>
                <div className="flex gap-6 flex-col justify-between h-full">
                    <div className="flex justify-between items-center w-full h-14">
                        <Link
                            to="/"
                            onClick={closeSidebar}
                            className="text-black flex flex-col">
                            <p className="font-semibold text-lg text-primary uppercase">Task Manager</p>
                            <p className="text-xs text-gray-400">Manage task / activities</p>
                        </Link>
                        <button
                            className="p-2 rounded-full border hover:bg-primary hover:text-white duration-150 ease-in-out md:hidden"
                            onClick={closeSidebar}>
                            <AiOutlineClose className="text-xl" />
                        </button>
                    </div>
                    <div className="flex-grow mb-4">
                        {
                            ROUTES.map((route, index) => (
                                <Link
                                    to={route.path}
                                    key={index}
                                    onClick={closeSidebar}
                                    className="flex gap-4 items-center py-2 px-3 rounded-lg hover:bg-primary hover:text-white duration-150 ease-in-out">
                                    <route.icon />
                                    <p>{route.title}</p>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar