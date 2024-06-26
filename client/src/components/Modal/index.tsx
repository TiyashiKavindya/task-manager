import React from 'react'
import { useAppContext } from '../../contexts'

type ModalProps = {
    name: string
    children: React.ReactNode
    title: string
    className?: string
}

function Modal({ name, children, title, className }: ModalProps) {
    const { modals } = useAppContext()
    if (modals[name]) {
        return (
            <dialog
                open={modals[name]}
                className={className}>
                <div className="fixed z-[9998] inset-0 bg-black/10 backdrop-blur-sm bg-opacity-60"></div>
                <div className="fixed md:top-1/2 bottom-2 left-1/2 transform -translate-x-1/2 md:-translate-y-1/2 bg-white z-[9999] px-4 py-6 md:px-6 rounded-xl shadow-lg min-w-[95%] mx-auto md:min-w-[60%] lg:min-w-[40%] min-h-56 h-fit m-2">
                    <p className='text-lg font-semibold mb-2'>{title}</p>
                    {children}
                </div>
            </dialog>
        )
    }
    return <></>
}

export default Modal