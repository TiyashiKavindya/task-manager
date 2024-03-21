
function Tag({ text, color }: { text: string, color: string }) {
    return (
        <span className="bg-white p-0 text-sm min-w-12 text-center" style={{ color: color, borderColor: color }}>#{text}</span>
    )
}

export default Tag