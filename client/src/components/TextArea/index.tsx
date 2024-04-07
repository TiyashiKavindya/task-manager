import { InputHTMLAttributes } from "react"

interface TeaxtAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    label: string
    rows?: number
}

function TextArea(props: TeaxtAreaProps) {
    const { label, ...rest } = props
    return (
        <div className="mb-1">
            <label>{label}</label>
            <textarea
                className="mt-1 w-full resize-none border border-gray-300 rounded-[5px] px-2 py-[7px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...rest} />
        </div>
    )
}

export default TextArea