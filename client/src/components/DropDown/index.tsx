import { useEffect, useRef, useState } from "react"
import { SelectOption } from "../../types"
import { MultiValue } from "react-select"

type DropdownProps = {
    children: React.ReactNode
    options: SelectOption[] | MultiValue<SelectOption>
    onChange: (id: number | string) => void
}
function DropDown({ children, options, onChange }: DropdownProps) {
    const [show, setShow] = useState<boolean>(false)
    const handleShow = () => setShow(!show)
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShow(false);
            }
        }
        document.addEventListener('click', close)
        return () => document.removeEventListener('click', close)
    }, [])

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={handleShow}>{children}</button>
            <div className={`absolute top-11 z-50 left-0 min-w-28 h-36 overflow-y-auto no-scrollbar rounded-lg bg-white shadow-lg border flex-col items-start justify-start ${show ? 'flex' : 'hidden'}`}>
                {
                    options.map(option => (
                        <button key={option.value} onClick={() => {
                            onChange(option.value)
                            handleShow()
                        }} className="w-full text-left text-dark text-nowrap pb-2 pt-1 px-3 hover:bg-gray-100 cursor-pointer">
                            {option.label}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default DropDown