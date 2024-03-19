import { InputHTMLAttributes } from 'react'

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;

}

function DatePicker(props: DatePickerProps) {
    const { label, ...rest } = props
    return (
        <div className='h-20'>
            <label className="">{label}</label>
            <input type='date' className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" {...rest} />
        </div>
    )
}

export default DatePicker