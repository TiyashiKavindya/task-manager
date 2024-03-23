export const nullableDate = (date: string) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        return null
    } else {
        return d
    }
}

export const nullableString = (s: string) => {
    return s === '' ? null : s
}