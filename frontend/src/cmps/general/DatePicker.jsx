import { useState, useEffect, useCallback } from 'react'

export function DatePicker({ initialStartDate, initialDueDate, onDatesChange }) {
    const [startDate, setStartDate] = useState(initialStartDate || '')
    const [dueDate, setDueDate] = useState(initialDueDate || '')
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [showStartDate, setShowStartDate] = useState(!!initialStartDate)
    const [showDueDate, setShowDueDate] = useState(!!initialDueDate || !initialStartDate)
    const [focusedInput, setFocusedInput] = useState(initialStartDate ? 'startDate' : 'dueDate')

    function isDateInRange(date) {
        if (!startDate || !dueDate) return false
        const start = parseDate(startDate)
        const end = parseDate(dueDate)
        return date >= start && date <= end
    }

    function renderCalendar() {
        const days = []
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()

        // Get the first day of the current month
        const firstDayOfMonth = new Date(year, month, 1).getDay()
        
        // Get the last day of the previous month
        const lastDayOfPrevMonth = new Date(year, month, 0).getDate()

        // Get the number of days in the current month
        const daysInMonth = new Date(year, month + 1, 0).getDate()

        // Calculate the number of days we need from the previous month
        const daysFromPrevMonth = firstDayOfMonth

        // Calculate the number of days we need from the next month
        const totalDays = 35 // 5 weeks * 7 days
        const daysFromNextMonth = totalDays - daysFromPrevMonth - daysInMonth

        // Add days from the previous month
        for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
            const date = new Date(year, month - 1, lastDayOfPrevMonth - i)
            days.push(renderDay(date, 'prev-month'))
        }

        // Add days from the current month
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i)
            days.push(renderDay(date, 'current-month'))
        }

        // Add days from the next month
        for (let i = 1; i <= daysFromNextMonth; i++) {
            const date = new Date(year, month + 1, i)
            days.push(renderDay(date, 'next-month'))
        }

        return days
    }

    function renderDay(date, monthClass) {
        const formattedDate = formatDateLocal(date)
        const isInRange = isDateInRange(date)
        const isStart = startDate === formattedDate
        const isEnd = dueDate === formattedDate
        const isToday = date.toDateString() === new Date().toDateString()

        let className = `calendar-day ${monthClass}`
        if (isInRange) className += " in-range"
        if (isStart || isEnd) className += " range-end"
        if (isToday) className += " today"

        return (
            <button
                key={formattedDate}
                className={className}
                onClick={() => handleDateClick(date)}
            >
                {date.getDate()}
            </button>
        )
    }

    const handleDateClick = useCallback((date) => {
        const formattedDate = formatDateLocal(date)

        if (showStartDate && focusedInput === 'startDate') {
            setStartDate(formattedDate)
			if (dueDate && dueDate < formattedDate) {
				const parsedDate = parseDate(formattedDate)
				const newDueDate = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate() + 1) // newDueDate is 1 day after startDate
				setDueDate(formatDateLocal(newDueDate))
			}
        } else {
            setDueDate(formattedDate)
			if (startDate && startDate > formattedDate) {
				const parsedDate = parseDate(formattedDate)
				const newStartDate = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate() - 1) // newStartDate is 1 day before dueDate
				setStartDate(formatDateLocal(newStartDate))
			}
        }
    }, [startDate, dueDate, focusedInput])


    function changeMonth(increment) {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + increment, 1))
    }

    useEffect(() => {
        if (initialStartDate) {
            setStartDate(initialStartDate)
            setShowStartDate(true)
        }
    }, [initialStartDate])

    useEffect(() => {
        if (initialDueDate || !initialStartDate) {
            setDueDate(initialDueDate)
            setShowDueDate(true)
        }
    }, [initialStartDate, initialDueDate])

	useEffect(() => {
		if (!startDate) return
		if (parseDate(startDate).getMonth() !== currentMonth.getMonth()) {
			changeMonth(-1)
		}
	}, [startDate])

    useEffect(() => {
        onDatesChange({ startDate, dueDate })
    }, [startDate, dueDate])

    function formatDateLocal(date) {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    function formatDateDisplay(dateString) {
        if (!dateString) return ''
        const [year, month, day] = dateString.split('-')
        return `${day}/${month}/${year}`
    }

    function parseDate(dateString) {
        const [year, month, day] = dateString.split('-')
        return new Date(year, month - 1, day)
    }

    function handleInputChange(e, setDateFunction) {
        const inputValue = e.target.value
        const [day, month, year] = inputValue.split('/')
        
        if (day && month && year) {
            const date = new Date(year, month - 1, day)
            if (!isNaN(date.getTime())) {
                setDateFunction(formatDateLocal(date))
            }
        } else {
            setDateFunction(inputValue)
        }
    }

    return (
        <div className="date-picker">
            <div className="month-selector">
                <button onClick={() => changeMonth(-1)}>&lt;</button>
                <span>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                <button onClick={() => changeMonth(1)}>&gt;</button>
            </div>
            <div className="calendar">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="calendar-day day-name">{day}</div>
                ))}
                {renderCalendar()}
            </div>
            <div className="start-date-checkbox">
                <input
                    type="checkbox"
                    id="startDateCheckbox"
                    checked={showStartDate}
                    onChange={(ev) => {
                        setShowStartDate(ev.target.checked)
                        if (ev.target.checked) {
                            setFocusedInput('startDate')
							const newStartDate = new Date(parseDate(dueDate) - 24 * 60 * 60 * 1000) // newStartDate is 1 day before dueDate
							setStartDate(formatDateLocal(newStartDate)) 
                        } else {
                            setStartDate('')
                            setFocusedInput('dueDate')
                        }
                    }}
                />
                <label htmlFor="startDateCheckbox">Start date</label>
            </div>
            {showStartDate && (
                <div className="date-input">
                    <input
                        type="text"
                        value={formatDateDisplay(startDate)}
                        onChange={(e) => handleInputChange(e, setStartDate)}
                        onFocus={() => setFocusedInput('startDate')}
                        placeholder="DD/MM/YYYY"
                    />
                </div>
            )}
			<div className="due-date-checkbox">
                <input
                    type="checkbox"
                    id="dueDateCheckbox"
                    checked={showDueDate}
                    onChange={(ev) => {
                        setShowDueDate(ev.target.checked)
                        if (ev.target.checked) {
                            setFocusedInput('dueDate')
							const now = new Date()
							const newDueDate = new Date(parseDate(dueDate) + 24 * 60 * 60 * 1000) // newDueDate is 1 day after startDate
							// const newDueDate = new Date(now.getFullYear(), now.getMonth(), 1) // newDueDate is 1st of current month
							setDueDate(formatDateLocal(newDueDate)) 
                        } else {
                            setDueDate('')
                            setFocusedInput('startDate')
                        }
                    }}
                />
                <label htmlFor="startDateCheckbox">Due date</label>
            </div>
            <div className="date-input">
                <input
                    type="text"
                    value={formatDateDisplay(dueDate)}
                    onChange={(e) => handleInputChange(e, setDueDate)}
                    placeholder="DD/MM/YYYY"
                    onFocus={() => setFocusedInput('dueDate')}
                />
            </div>
        </div>
    )
}