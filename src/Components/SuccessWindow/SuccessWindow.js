import React, { Component } from 'react';
import './SuccessWindow.css';

 class SuccessWindow extends Component{

   constructor(props){
     super(props);

     }

render(){
     return(
       <div className={this.props.WindowClass}>
        <h2 className="SuccessWindowHeader"> Playlist have been saved</h2>
        <div className="buttons">
         <a className="SuccessWindow-b" onClick={this.props.onClose}>OK</a>
        </div>
       </div>
     );

   }
 }

export default SuccessWindow;
