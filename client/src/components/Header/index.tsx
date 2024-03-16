type HeaderProps = {
    showSidebar: boolean
    setShowSidebar: (show: boolean) => void
}
function Header({ showSidebar, setShowSidebar }: HeaderProps) {
    return (
        <div className="sticky top-0 left-0 right-0 h-14 bg-gray-800 text-white">
            <div className="flex justify-between items-center">
                <div>Header</div>
                <button onClick={() => setShowSidebar(!showSidebar)} className="md:hidden">Toggle Sidebar</button>
            </div>
        </div>
    )
}

export default Header