// component types
export type ContextProviderProps = {
    children: React.ReactNode
}

// attributes types
export type SelectOption = {
    label: string
    value: string | number
}

// data types
export type Task = {
    title: string
    status: string
    description: string
    tags: string[]
    startDate: string
    dueDate: string
}

export type Tag = {
    id: number,
    name: string,
    color: string
}
