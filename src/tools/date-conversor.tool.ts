export const dateConversor = {
  getLabel: (dateString: string) => {
    const now = Date.now()
    const date = new Date(dateString).getTime()
    const millisecondsOnDay = 86400000
    const pastDaysCount = (now - date) / millisecondsOnDay

    if (pastDaysCount <= 1) {
      const pastHoursCount = pastDaysCount * 24

      return `${pastHoursCount.toFixed()} hours ago`
    } else if (pastDaysCount >= 30) {
      const pastMonthsCount = pastDaysCount / 30

      return `${pastMonthsCount.toFixed()} months ago`
    } else {
      return `${pastDaysCount.toFixed()} days ago`
    }
  }
}
