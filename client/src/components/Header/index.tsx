import { AiOutlineMenu } from "react-icons/ai"
import { useAppContext } from "../../contexts"

type HeaderProps = {
    title?: string
    actionButtonText?: string
    actionButtonIcon?: React.ReactNode
    onActionButtonClick?: () => void
    actionButtonClassName?: string
}

function Header({ title, actionButtonClassName, onActionButtonClick, actionButtonText, actionButtonIcon }: HeaderProps) {
    const { openSidebar } = useAppContext()

    return (
        <div className="mt-6 h-10">
            <div className="flex h-full justify-between items-center">
                <div>
                    {
                        title && <>
                            <p className="text-2xl font-semibold text-light">{title}</p>
                        </>
                    }
                </div>
                <div className="fixed bottom-6 right-6 rounded-full shadow md:shadow-none md:static">
                    <button
                        className={`btn ${actionButtonClassName}`}
                        onClick={onActionButtonClick}>
                        {actionButtonIcon} {actionButtonText}
                    </button>
                </div>
                <button
                    onClick={openSidebar}
                    className="md:hidden">
                    <AiOutlineMenu />
                </button>
            </div>
        </div>
    )
}

export default Header