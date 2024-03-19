import { AiOutlineMenu } from "react-icons/ai";
import { useAppContext } from "../../contexts";

type HeaderProps = {
    title?: string
    actionButtonText: string
    actionButtonIcon?: React.ReactNode
    onActionButtonClick?: () => void
    actionButtonClassName?: string
}

function Header({ title, actionButtonClassName, onActionButtonClick, actionButtonText, actionButtonIcon }: HeaderProps) {
    const { openSidebar } = useAppContext()

    return (
        <div className="sticky top-0 left-0 right-0 h-14">
            <div className="flex h-full justify-between items-center">
                <div>
                    {
                        title && <>
                            <p className="text-2xl font-semibold text-dark">{title}</p>
                        </>
                    }
                </div>
                <div className="fixed bottom-8 right-8 rounded-full shadow md:shadow-none md:static">
                    <button className={`btn ${actionButtonClassName}`} onClick={onActionButtonClick}>{actionButtonIcon} {actionButtonText}</button>
                </div>
                <button onClick={openSidebar} className="md:hidden"><AiOutlineMenu /></button>
            </div>
        </div>
    )
}

export default Header