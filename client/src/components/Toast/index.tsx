import { useAppContext } from "../../contexts"

function Toast() {
    const { showToast, toastMsg } = useAppContext()
    return (
        <div className={`fixed bottom-10 px-6 bg-white py-4 rounded-lg shadow-lg border border-dark min-w-80 duration-300 ease-in-out ${showToast ? ' right-10 opacity-100' : ' -right-96 opacity-0'}`}>
            <p className="text-dark font-semibold">{toastMsg.title}</p>
            <p className="text-dark-light text-xs">{toastMsg.message}</p>
        </div>
    )
}

export default Toast