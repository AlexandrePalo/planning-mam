import React, { Component } from 'react'

import Day from './Day'

import { daysHours } from './data/childrenHours'

class Planning extends Component {
    render() {
        return Object.keys(daysHours).map((k, i) => {
            return <Day day={k} data={daysHours[k]} key={i} />
        })
    }
}

export default Planning
