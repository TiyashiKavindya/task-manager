import { InputHTMLAttributes } from "react"

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
}
function InputField(props: InputFieldProps) {
    const { label, ...rest } = props
    return (
        <div className="mb-1 flex-grow">
            <label>{label}</label>
            <input
                className="mt-1 w-full border border-gray-300 rounded-[5px] px-2 py-[7px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...rest} />
        </div>
    )
}

export default InputField