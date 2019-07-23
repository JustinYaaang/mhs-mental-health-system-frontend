import "../assets/css/401.css"
import React from 'react';

class Error401 extends React.Component {
    render(){
        return(

  <div class="page-wrap">
    <h1>401</h1>
    <h2>unauthorized</h2>
    <p>Well, what to say. Hmm? Sorry ...</p>
    <p><a href="/">home</a></p>
  </div>

        );
    }
}

export default Error401;