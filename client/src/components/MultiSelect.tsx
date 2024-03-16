import { SelectHTMLAttributes, useState } from 'react'
import { SelectOption } from '../types';

interface MultiSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: SelectOption[];
}

function MultiSelect(props: MultiSelectProps) {
    const { label, options, onChange, ...rest } = props
    const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([])

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => ({ value: option.value, label: option.textContent })) as SelectOption[]
        setSelectedOptions(selectedOptions)
        onChange && onChange(e)
    }

    return (
        <div>
            <label className="">{label}</label>
            <div className="flex flex-wrap gap-1">
                {selectedOptions.map((option, index) => (
                    <span key={index} className="bg-emerald-500 text-white py-1 px-2 text-sm rounded-full">{option.label}</span>
                ))}
            </div>
            <select className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                onChange={handleSelectChange}
                {...rest}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}

export default MultiSelect