import dayjs from "dayjs"

const firstDayOfWeek = dayjs().startOf('week').toDate()
const lastDayOfWeek = dayjs().endOf('week').toDate()

export { firstDayOfWeek, lastDayOfWeek }