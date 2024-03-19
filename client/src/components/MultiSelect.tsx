import { useState } from "react"

type SelectOption = {
    label: string
    value: string | number
}

type MultipleSelectProps = {
    label: string
    className?: string
    options: SelectOption[]
    value: SelectOption[]
    onChange: (value: SelectOption[]) => void
}

function MultiSelect({ label, className, value, onChange, options }: MultipleSelectProps) {
    const [isOpen, setIsOpen] = useState(false)

    function clearOptions() {
        onChange([])
    }

    function selectOption(option: SelectOption) {

        if (value.includes(option)) {
            onChange(value.filter(o => o !== option))
        } else {
            onChange([...value, option])
        }
    }

    function isOptionSelected(option: SelectOption) {
        return value.includes(option)
    }

    return (
        <div className={`my-1 ${className}`}>
            <p className='pb-1'>{label}</p>
            <div
                onBlur={() => setIsOpen(false)}
                onClick={() => setIsOpen(prev => !prev)}
                className='relative z-0 w-full h-10 border flex items-center gap-2 rounded-lg outline-none px-2'
            >
                <span className='flex-grow flex gap-1 flex-wrap'>
                    {value.map(v => (
                        <button
                            key={v.value}
                            onClick={e => {
                                e.stopPropagation()
                                selectOption(v)
                            }}
                            className='flex items-center gap-1 border rounded-full px-2 py-1 text-sm cursor-pointer bg-none outline-none'
                        >
                            {v.label}
                            <span className={"remove-btn"}>&times;</span>
                        </button>
                    ))}
                </span>
                <button
                    onClick={e => {
                        e.stopPropagation()
                        clearOptions()
                    }}
                    className=' bg-none text-gray-600 border-none outline-none cursor-pointer hover:text-gray-800 transition-colors duration-300 ease-in-out p-0'
                >
                    &times;
                </button>
                <ul className={`absolute shadow-md m-0 p-0 list-none max-h-28 overflow-y-auto border w-full left-0 top-full bg-white z-[9999] ${isOpen ? ' block' : "hidden"}`}>
                    {options.map((option) => (
                        <li
                            onClick={e => {
                                e.stopPropagation()
                                selectOption(option)
                                setIsOpen(false)
                            }}
                            key={option.value}
                            className={`px-2 py-1 cursor-pointer hover:bg-emerald-500 hover:text-white ${isOptionSelected(option) ? 'bg-gray-100' : ""
                                } `}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MultiSelect