import React, {Component} from 'react'
import moment from 'moment'
import Timer from './Timer'
import Controls from './Controls'
import Datepicker from './Datepicker'

export default class Countdown extends Component {

  state = {
    duration: this.getRemainingTime(),
    paused: false
  }

  componentDidMount() {
    this.resume()
  }

  componentWillUnmount() {
    this.pause()
  }

  getRemainingTime() {
    let now = moment(),
      newYear = moment({
        year: now.year() + 1
      }),
      diff = newYear.diff(now)

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
        duration: this.getRemainingTime()
      })
    }, 1000)
  }

  render() {
    const { duration, paused } = this.state

    return <section className="hero is-light is-bold is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">
            Counting 2019
          </h1>
          <section className="section">
            <Timer duration={duration}/>

          </section>
          <Datepicker/>
          <Controls paused={paused} onPausedToggle={this.handlePausedToggle}/>
        </div>
      </div>
    </section>
  }
}
