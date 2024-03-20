
type ScrollableProps = {
    children: React.ReactNode
}

function Scrollable({ children }: ScrollableProps) {
    return (
        <>
            <div className="flex-grow overflow-y-auto no-scrollbar">
                {children}
            </div>
            <div className="hidden md:block"></div>
        </>

    )
}

export default Scrollable;