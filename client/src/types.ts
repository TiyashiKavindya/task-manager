export type ContextProviderProps = {
    children: React.ReactNode
}

export type SelectOption = {
    label: string
    value: string | number
}

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
