import React from 'react'

const Datepicker = (props) =>
<div className="field is-grouped is-grouped-centered" style={{marginBottom: 40}}>
  <p className="control">
    <input className="input is-medium is-rounded" placeholder="Type a date you want"/>
  </p>
  <p className="control">
    <a className="button is-grey is-outlined is-medium is-rounded">
      Search
    </a>
  </p>
</div>

export default Datepicker
