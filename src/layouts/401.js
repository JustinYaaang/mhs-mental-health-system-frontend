import '../assets/css/401.css'
import React from 'react'

class Error401 extends React.Component {
  render () {
    return (
      <div class='page-body'>
        <div class='page-wrap'>
          <h1>401</h1>
          <h2>unauthorized</h2>
          <p>Well, what to say. Hmm? Sorry ...</p>
          <p class='redirect-p'><a class='redirect-a' href='/'>home</a></p>
        </div>
      </div>

    )
  }
}

export default Error401
