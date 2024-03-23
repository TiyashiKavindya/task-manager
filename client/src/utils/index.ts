import { MultiValue } from "react-select"
import { SelectOption } from "../types"

export const convertDateFormat = (dateString: string | null, separator: string = '-') => {
    if (!dateString || dateString === '') return
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}${separator}${month}${separator}${day}`
}

export const makeAsOptions = (arr: any[], labelKey: string | number, valueKey: string | number) => {
    return arr.map((o: any) => ({ label: o[labelKey], value: o[valueKey] })) as MultiValue<SelectOption>
}
