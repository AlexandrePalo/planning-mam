import React, { Component } from 'react'

import Day from './Day'

import { convertToDayHours } from './data/childrenHours'

class Planning extends Component {
    render() {
        return ['L', 'M', 'J', 'V'].map((k, i) => {
            return <Day day={k} data={convertToDayHours(k)} key={i} />
        })
    }
}

export default Planning
