import { useAppContext } from '../../contexts'
import { FcHighPriority } from "react-icons/fc";
import '../../loading.scss'

type LoadingProps = {
    children?: React.ReactNode
}

function Loading({ children }: LoadingProps) {
    const { isLoading, error } = useAppContext()
    if (isLoading) {
        return (
            <div className='min-h-56 h-full w-full grid place-items-center'>
                <span className="loader border-2 border-emerald-500 after:border-2 after:border-emerald-500"></span>
            </div>
        )
    } else {
        if (error) {
            return (
                <div className='min-h-56 h-full w-full flex flex-col items-center justify-center gap-1'>
                    <FcHighPriority className='text-3xl' />
                    <p className='text-xl text-gray-900'>Something went wrong!</p>
                    <p className='text-gray-400 text-sm'>Please try again shortly.</p>
                    <p className='text-gray-400 text-xs'>{error}</p>
                </div>
            )
        }
        if (children !== undefined) {
            return <>{children}</>
        }
        return <></>
    }
}

export default Loading