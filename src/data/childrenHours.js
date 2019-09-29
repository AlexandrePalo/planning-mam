import moment from 'moment'

const childrenHours = {
    AUREL: [
        { day: 'L', from: '07:30', to: '17:30' },
        { day: 'M', from: '07:30', to: '17:30' },
        { day: 'J', from: '07:30', to: '17:30' },
        { day: 'V', from: '07:30', to: '16:30' }
    ],
    LEONIE: [
        { day: 'M', from: '07:30', to: '17:30' },
        { day: 'V', from: '07:30', to: '17:30' }
    ],
    LORIS: [
        { day: 'L', from: '12:00', to: '14:00' },
        { day: 'L', from: '16:00', to: '17:00' },
        { day: 'J', from: '12:00', to: '14:00' },
        { day: 'J', from: '16:00', to: '17:00' },
        { day: 'V', from: '12:00', to: '14:00' },
        { day: 'V', from: '16:00', to: '17:00' }
    ],
    MARIELOU: [
        { day: 'L', from: '07:30', to: '16:00' },
        { day: 'M', from: '08:00', to: '18:00' },
        { day: 'V', from: '08:00', to: '13:00' }
    ],
    EMMIE: [
        { day: 'L', from: '08:30', to: '12:00' },
        { day: 'M', from: '08:30', to: '12:00' },
        { day: 'J', from: '08:30', to: '12:00' },
        { day: 'V', from: '08:30', to: '12:00' }
    ],
    MATHIAS: [
        { day: 'M', from: '07:30', to: '08:30' },
        { day: 'M', from: '12:00', to: '17:30' },
        { day: 'V', from: '07:30', to: '08:30' },
        { day: 'V', from: '12:00', to: '17:30' }
    ],
    CHARLY: [
        { day: 'M', from: '08:30', to: '17:30' },
        { day: 'J', from: '08:30', to: '17:30' },
        { day: 'V', from: '08:30', to: '17:30' }
    ],
    EYDEN: [
        { day: 'L', from: '09:00', to: '18:30' },
        { day: 'V', from: '09:00', to: '18:30' }
    ],
    ALICE: [
        { day: 'M', from: '07:00', to: '17:00' },
        { day: 'J', from: '07:00', to: '17:00' }
    ],
    MAXINE: [
        { day: 'L', from: '08:30', to: '17:00' },
        { day: 'J', from: '08:30', to: '17:00' },
        { day: 'V', from: '08:30', to: '17:00' }
    ]
}

const convertToMin = textTime =>
    moment(textTime, 'HH:mm').hours() * 60 + moment(textTime, 'HH:mm').minutes()

const convertToDaysHours = childrenHour => {
    const startHour = moment('07:00', 'HH:mm')
    const endHour = moment('19:00', 'HH:mm')
    let daysHours = { L: [], M: [], J: [], V: [] }
    let currentHour = startHour.clone()

    // Generate hours
    let hours = []
    do {
        hours.push({ from: currentHour.format('HH:mm'), presents: [] })
        currentHour = currentHour.add(30, 'm')
        hours[hours.length - 1].to = currentHour.format('HH:mm')
    } while (endHour.format('HH') > currentHour.format('HH'))
    Object.keys(daysHours).forEach(day => {
        daysHours[day] = [...hours]
    })

    // Apply children presence
    Object.keys(daysHours).forEach(day => {
        daysHours[day].forEach((range, i) => {
            // Every day and every range

            Object.keys(childrenHours).forEach(child => {
                // Every child and every presence
                childrenHours[child]
                    .filter(p => p.day === day)
                    .forEach(presence => {
                        if (
                            convertToMin(presence.from) <=
                                convertToMin(range.from) &&
                            convertToMin(presence.to) >= convertToMin(range.to)
                        ) {
                            if (daysHours[day][i].presents.indexOf(child) < 0) {
                                daysHours[day][i].presents.push(child)
                            }
                        }
                    })
            })
        })
    })

    return daysHours
}

export const daysHours = convertToDaysHours(childrenHours)
