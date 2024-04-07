import '../../loading.scss'
function LoadingEl() {
    return (
        <div className='min-h-56 h-full w-full grid place-items-center'>
            <span className="loader border-2 border-primary after:border-2 after:border-primary"></span>
        </div>
    )
}
export default LoadingEl