type ContainerProps = {
    children: React.ReactNode
}
function Container({ children }: ContainerProps) {
    return (
        <div className="fixed left-0 md:left-60 duration-200 ease-in-out right-0 bottom-0 top-0 ">
            {children}
        </div>
    )
}

export default Container