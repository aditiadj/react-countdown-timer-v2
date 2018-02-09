import React, {Component} from 'react'
import moment from 'moment'
import 'moment-holiday'

import Timer from './Timer'
import Controls from './Controls'
import Datepicker from './Datepicker'
import Holidays from './Holidays'

export default class Countdown extends Component {

  state = {
    currentDate: moment(),
    nextDate: moment({year: moment().year() + 1}),
    paused: false,
    showHolidays: false
  }

  componentDidMount() {
    this.resume()
  }

  componentWillUnmount() {
    this.pause()
  }

  getRemainingTime() {
    let {currentDate, nextDate} = this.state,
    diff = nextDate.diff(currentDate)

    return moment.duration(diff)
  }

  handlePausedToggle = () => {
    this.setState((prevState, props) => {
      const paused = !prevState.paused

      if (paused) {
        this.pause()
      } else {
        this.resume()
      }

      return {
        paused
      }
    })
  }

  pause() {
    clearInterval(this.interval)
  }

  resume() {
    this.interval = setInterval(() => {
      this.setState({
        currentDate: moment()
      })
    }, 1000)
  }

  handleDateReset = nextDate => {
    this.setState({
      nextDate
    })
  }

  handleHolidaysToggle = () => {
    this.setState({
      showHolidays: !this.state.showHolidays
    })
  }

  getHolidays() {
    const {currentDate, nextDate} = this.state

    return currentDate.holidaysBetween(nextDate)
  }

  render() {
    const { paused, nextDate, showHolidays } = this.state,
    duration = this.getRemainingTime(),
    holidays = this.getHolidays()

    return <section className="hero is-light is-bold is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">
            Counting {nextDate.calendar()} (US Calendar)
            <button
              className="button is-small is-rounded is-dark"
              style={{margin: '5px 0 0 10px'}}
              onClick={this.handleHolidaysToggle}>
              Holidays
            </button>
          </h1>
          <section className="section">
            <Timer duration={duration}/>

          </section>

          <Datepicker onDateReset={this.handleDateReset}/>

          <Controls paused={paused} onPausedToggle={this.handlePausedToggle}/>

          <Holidays holidays={holidays} active={showHolidays} onToggle={this.handleHolidaysToggle}/>
        </div>
      </div>
    </section>
  }
}
