import { Link } from "react-router-dom"
import { AiOutlineClose } from "react-icons/ai";
import { Fragment } from "react/jsx-runtime";
import { ROUTES } from "../../routes";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useAppContext } from "../../contexts";

function Sidebar() {
    const { showSidebar, closeSidebar } = useAppContext()
    return (
        <Fragment>
            <div className={`fixed z-20 bottom-0 top-0 left-0 md:static w-[275px] duration-200 ease-in-out text-gray-700 bg-white shadow-md pl-6 pr-4 py-4 border-r-2 ${showSidebar ? 'translate-x-0' : 'translate-x-[-100%]'}`}>
                <div className="flex gap-6 flex-col justify-between h-full">
                    <div className="flex justify-between items-center w-full h-14">
                        <Link to="/" onClick={closeSidebar} className="text-black flex flex-col">
                            <p className="font-semibold text-lg text-emerald-600 uppercase">Task Manager</p>
                            <p className="text-xs text-gray-400">Manage task / activities</p>
                        </Link>
                        <button className="p-2 rounded-full border hover:bg-emerald-600 hover:text-white duration-150 ease-in-out md:hidden"
                            onClick={closeSidebar}
                        ><AiOutlineClose className="text-xl" /></button>
                    </div>
                    <div className="flex-grow mb-4">
                        {
                            ROUTES.map((route, index) => (
                                <Link to={route.path} key={index} onClick={closeSidebar} className="flex gap-4 items-center py-2 px-3 rounded-lg hover:bg-emerald-600 hover:text-white duration-150 ease-in-out">
                                    <route.icon />
                                    <p className="">{route.title}</p>
                                </Link>
                            ))
                        }

                    </div>
                </div>
            </div>
            <div className={`fixed bg-transparent z-[15] md:hidden inset-0 duration-150 ease-out ${showSidebar ? 'block opacity-100 backdrop-blur-[2px] brightness-50' : 'hidden opacity-0'}`}>a</div>
        </Fragment>
    )
}

export default Sidebar