// format date in database => dd/mm/yyyy
// ex: 2024-05-04T17:00:00.000Z => 05/05/2024
export const formatDateToDisplay = (date: Date | string) => {
  const dateFormat = new Date(date).toLocaleDateString('en-GB')
  return dateFormat
}

// format date (dd/mm/yyyy) in client => original date to save in database
// ex: 05/05/2024 => 2024-05-04T17:00:00.000Z
export const formatDateToSave = (date: string) => {
  const [day, month, year] = date.split('/')
  const dateFormat = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  return dateFormat
}

// subtract day from date, params: date, number of subtract
export const subtractDate = (date: Date, numberDay: number) => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() - numberDay)
  return newDate
}

// format datetime to display time
export const formatTimeToDisplay = (time: string) => {
  const datetime = new Date(time)
  const hours = datetime.getHours()
  const minutes = datetime.getMinutes()

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`

  return `${formattedHours}:${formattedMinutes}`
}

// convert date to time (ex: 20:30 PM)
export const convertDateStringToTime = (dateString: string): string => {
  const date = new Date(dateString)
  const hours = date.getHours()
  const minutes = date.getMinutes()

  let period = 'AM'
  let adjustedHours = hours

  if (hours >= 12) {
    period = 'PM'
    adjustedHours = hours - 12
  }

  if (adjustedHours === 0) {
    // adjustedHours = 12
    adjustedHours = 0
  }

  const timeString = `${adjustedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`

  return timeString
}

export const formatDatetimeToDisplay = (date: string) => {
  const datetime = new Date(date)
  const day = datetime.getDate().toString().padStart(2, '0')
  const month = (datetime.getMonth() + 1).toString().padStart(2, '0') // Tháng bắt đầu từ 0 nên cần +1
  const year = datetime.getFullYear()
  const hours = datetime.getHours().toString().padStart(2, '0')
  const minutes = datetime.getMinutes().toString().padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}
