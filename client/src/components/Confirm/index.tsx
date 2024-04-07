import { useAppContext } from "../../contexts"
import { IoWarningOutline } from "react-icons/io5"

function Confirm() {
    const { confirmAlert, hideConfirm } = useAppContext()
    return (
        <dialog open={confirmAlert.show}>
            <div className="fixed z-[9998] inset-0 bg-black/10 backdrop-blur-sm bg-opacity-60"></div>
            <div className="fixed md:top-1/2 bottom-2 left-1/2 transform -translate-x-1/2 md:-translate-y-1/2 bg-white z-[9999] px-4 py-6 md:px-6 rounded-xl shadow-lg w-[95%] mx-auto md:w-[400px] min-h-56 h-fit flex flex-col gap-4 justify-between items-center">
                <div className="flex-grow flex flex-col justify-center items-center gap-1">
                    <IoWarningOutline className="text-5xl mb-2" />
                    <p className='text-lg text-center'>{confirmAlert.title}</p>
                    <p className='text-sm text-center text-slate-500'>{confirmAlert.message}</p>
                </div>
                <div className="flex gap-4 justify-center items-center">
                    <button
                        className="w-20 px-4 py-2 rounded-lg border border-dark bg-light text-dark duration-300 ease-in-out"
                        onClick={() => {
                            confirmAlert.onCencel && confirmAlert.onCencel()
                            hideConfirm()
                        }}>
                        {confirmAlert.cancelText}
                    </button>
                    <button
                        className="w-20 px-4 py-2 rounded-lg border border-rose-600 bg-rose-600 text-white hover:bg-red-500 duration-300 ease-in-out"
                        onClick={() => {
                            confirmAlert.onOk()
                            hideConfirm()
                        }}>
                        {confirmAlert.okText}
                    </button>
                </div>
            </div>
        </dialog>
    )
}

export default Confirm