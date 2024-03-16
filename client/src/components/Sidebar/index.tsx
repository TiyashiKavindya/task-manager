function Sidebar({ showSidebar }: { showSidebar: boolean }) {
    return (
        <div className={`fixed z-20 bottom-0 top-0 left-0 w-60 duration-200 ease-in-out bg-blue-900 text-white shadow-2xl ${showSidebar ? 'translate-x-0' : 'translate-x-[-100%]'}`}>Sidebar</div>
    )
}

export default Sidebar