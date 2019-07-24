import "../assets/css/401.css"
import React from 'react';

class NotFound extends React.Component {
    render(){
        return(

  <div class="page-wrap">
    <h1>404</h1>
    <h2>not found</h2>
    <p>Sorry this page does not exist ...</p>
    <p><a href="/">home</a></p>
  </div>

        );
    }
}

export default NotFound;