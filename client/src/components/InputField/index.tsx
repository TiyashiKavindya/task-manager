import { InputHTMLAttributes } from "react"

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}
function InputField(props: InputFieldProps) {
    const { label, ...rest } = props
    return (
        <div className="h-20 flex-grow">
            <label className="">{label}</label>
            <input className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" {...rest} />
        </div>
    )
}

export default InputField