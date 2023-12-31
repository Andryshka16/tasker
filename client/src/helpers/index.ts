const formatDate = (date: Date) => {
	const dateObj = new Date(date)
	const isToday = dateObj.toDateString() === new Date().toDateString()

	const day = dateObj.getDay()
	const month = dateObj.toDateString().split(' ')[1]

	return isToday ? 'Today' : `${day} ${month}`
}

const swapElements = <T>(array: T[], x: number, y: number) => {
	const temporary = array[x]
	array[x] = array[y]
	array[y] = temporary
}

export { formatDate, swapElements }
