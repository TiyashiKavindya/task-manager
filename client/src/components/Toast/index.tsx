import { useAppContext } from "../../contexts"

function Toast() {
    const { showToast, toastMsg } = useAppContext()
    return (
        <div className={`fixed bottom-10 px-6 bg-white py-4 rounded-lg shadow-lg border border-slate-300 min-w-80 duration-300 ease-in-out ${showToast ? ' right-10 opacity-100' : ' -right-96 opacity-0'}`}>
            <p>{toastMsg.title}</p>
            <p className="text-gray-600 text-xs font-thin">{toastMsg.message}</p>
        </div>
    )
}

export default Toast