import { InputHTMLAttributes } from 'react'

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;

}

function DatePicker(props: DatePickerProps) {
    const { label, ...rest } = props
    return (
        <div className='h-20'>
            <label className="">{label}</label>
            <input type='date' className="mt-1 w-full border border-gray-300 rounded-[5px] px-2 py-[7px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" {...rest} />
        </div>
    )
}

export default DatePicker