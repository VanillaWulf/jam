import React, { Component } from 'react';
import './SuccessWindow.css';

 class SuccessWindow extends Component{

   constructor(props){
     super(props);
     this.state = { class:'noWindow'};

     this.closeWindow = this.closeWindow.bind(this);
     this.openWindow = this.openWindow.bind(this);
   }

   openWindow(){
     this.props.onWindow(
       this.setState({ class: 'SuccessWindow'})
     );
   }

   closeWindow(){
     this.setState({ class:'noWindow'});
    }

   render(){
     return(
       <div className={this.state.class}>
        <h2 className="SuccessWindowHeader">Play list saved</h2>
        <div className="buttons">
         <a className="SuccessWindow-b" onClick={this.closeWindow}>OK</a>
        </div>
       </div>
     );

   }
 }

export default SuccessWindow;
