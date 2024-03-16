import { AiOutlineMenu } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useAppContext } from "../../contexts";

type HeaderProps = {
    title?: string
}

function Header({ title }: HeaderProps) {
    const { openSidebar } = useAppContext()

    return (
        <div className="sticky top-0 left-0 right-0 h-14">
            <div className="flex h-full justify-between items-center">
                <div>
                    {
                        title && <>
                            <p className="text-2xl font-semibold text-dark">{title}</p>
                            {/* <div className="w-4 h-1 rounded-full bg-emerald-500"></div> */}
                        </>
                    }
                </div>
                <div className="hidden md:flex gap-4">
                    <button className="btn bg-emerald-500 text-white hover:bg-emerald-600"><IoIosAddCircleOutline /> Task</button>
                    <button className="btn bg-sky-500 text-white hover:bg-sky-600"><IoIosAddCircleOutline /> Activity</button>
                </div>
                <button onClick={openSidebar} className="md:hidden"><AiOutlineMenu /></button>
            </div>
        </div>
    )
}

export default Header