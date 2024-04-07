type ContentProps = {
    children: React.ReactNode
}

function Content({ children }: ContentProps) {
    return (
        <div className="flex-grow duration-200 h-full ease-in-out px-4 sm:px-6 md:px-8 lg:pl-8 lg:pr-12 flex flex-col gap-6">
            {children}
        </div>
    )
}

export default Content