import React, { Component } from 'react'

import { childrenOwner } from './data/childrenOwner'
const fullDayName = { L: 'Lundi', M: 'Mardi', J: 'Jeudi', V: 'Vendredi' }
const shortOwnerName = { NATHALIE: 'N', JESSIE: 'J', SYLVIE: 'S' }

class Day extends Component {
    render() {
        const { day, data } = this.props

        return (
            <div className="day">
                <span>{fullDayName[day]}</span>
                <div className="day__row header">
                    {data.map((d, i) => {
                        return (
                            <div key={i}>
                                <span>{d.from}</span>
                                <span>-</span>
                                <span>{d.to}</span>
                            </div>
                        )
                    })}
                </div>

                {Object.keys(childrenOwner).map((c, i) => {
                    return (
                        <div className="day__row" key={i}>
                            <div className="header">
                                <span>{c}</span>
                            </div>
                            {data.map((d, j) => {
                                return (
                                    <div key={j}>
                                        <span>
                                            {d.presents.indexOf(c) >= 0
                                                ? shortOwnerName[
                                                      childrenOwner[c]
                                                  ]
                                                : ''}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Day
