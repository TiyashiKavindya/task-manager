import { SelectHTMLAttributes } from 'react'
import { SelectOption } from '../../types';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: SelectOption[]
    className?: string
}

function Select(props: SelectProps) {
    const { label, options, className, ...rest } = props
    return (
        <div className={`h-20 ${className}`}>
            <label className="">{label}</label>
            <select className="mt-1 py-[8px] w-full border border-gray-300 rounded-[5px] px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" {...rest}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}

export default Select