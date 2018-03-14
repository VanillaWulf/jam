import React, { Component } from 'react';
import './SuccessWindow.css';

 class SuccessWindow extends Component{

   constructor(props){
     super(props);
     this.renderHeader = this.renderHeader.bind(this);
     }

  renderHeader(isSaved){
       if(isSaved=='1'){
         return 'Playlist have been saved'
       }else{
         return 'Playlist have been reset'
       }
  }

  render(){
     return(
       <div className={this.props.WindowClass}>
        <h2 className="SuccessWindowHeader"> {this.renderHeader(this.props.SaveTrigger)}</h2>
        <div className="buttons">
         <a className="SuccessWindow-b" onClick={this.props.onClose}>OK</a>
        </div>
       </div>
     );

   }
 }

export default SuccessWindow;
