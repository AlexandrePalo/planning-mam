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
        { day: 'L', from: '12:00', to: '13:30' },
        { day: 'L', from: '16:00', to: '17:00' },
        { day: 'J', from: '12:00', to: '13:30' },
        { day: 'J', from: '16:00', to: '17:00' },
        { day: 'V', from: '12:00', to: '13:30' },
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

export const convertToDayHours = day => {
    const startHour = moment('07:00', 'HH:mm')
    const endHour = moment('19:00', 'HH:mm')
    let dayHours = []
    let currentHour = startHour.clone()

    // Generate hours
    do {
        dayHours.push({ from: currentHour.format('HH:mm') })
        currentHour = currentHour.add(30, 'm')
        dayHours[dayHours.length - 1].to = currentHour.format('HH:mm')
    } while (endHour.format('HH') > currentHour.format('HH'))

    for (let b = 0; b < dayHours.length; b++) {
        const range = dayHours[b]
        range.presents = []

        for (let c = 0; c < Object.keys(childrenHours).length; c++) {
            const child = Object.keys(childrenHours)[c]

            for (let d = 0; d < childrenHours[child].length; d++) {
                const presence = childrenHours[child][d]

                if (presence.day === day) {
                    /*
                    console.log(
                        day,
                        child,
                        presence.from,
                        presence.to,
                        range.from,
                        range.to,
                        convertToMin(presence.from) <= convertToMin(range.from),
                        convertToMin(presence.to) >= convertToMin(range.to)
                    )
                    */

                    if (
                        convertToMin(presence.from) <=
                            convertToMin(range.from) &&
                        convertToMin(presence.to) >= convertToMin(range.to)
                    ) {
                        range.presents.push(child)
                    }
                }
            }
        }
    }
    return dayHours
}
