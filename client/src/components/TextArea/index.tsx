import { InputHTMLAttributes } from "react";

interface TeaxtAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

function TextArea(props: TeaxtAreaProps) {
    const { label, ...rest } = props
    return (
        <div className="mb-1">
            <label className="">{label}</label>
            <textarea className="mt-1 w-full resize-none h-28 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" {...rest}></textarea>
        </div>
    )
}

export default TextArea