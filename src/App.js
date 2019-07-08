import React, {Component, Fragment} from 'react'
import {but, calculate, validateMemory} from './calcLogic';
import './App.css';

class App extends Component {

  state = {
    expression: '',
    operand: '',
    operator: [],
    memory: 'MR'
  }

  componentDidMount(){    
    let arr = [...but]
    let mk = document.getElementById('but');
    let buttons = ''
    for(let i = 0; i < arr.length; i++){
      buttons += `<div class="grid-item">${arr[i]}</div>`
      }
      mk.innerHTML = buttons            
    } 
  
  handleClick = ({target}) => {    
    let {expression, operator, operand, memory} = this.state;
     if(target.innerText.length < 5){
      switch(true){
        case /[0-9.]/.test(target.innerText): this.setState({expression: expression + target.innerText}); 
        break;
        case /[-+*\/]+/.test(target.innerText): operator.length ? this.setState({expression: expression}) 
         : this.setState({operand: expression, expression: '', operator: target.innerText});
        break;        
        case /\w{5}/.test(target.innerText): this.setState({expression: '123456789'}); 
        break;
        case new RegExp(`\\${memory}`).test(target.innerText): this.setState({expression: memory, memory: 'MR'}); 
        break;
        case /=/.test(target.innerText): 
          setTimeout(()=>this.setState({expression: calculate(operand, expression, operator)}), 30)
          setTimeout(()=>{
            this.setState({memory: calculate(operand, expression, operator), expression: '', operator: [], operand: []})
            this.memorize() 
          }, 600)               
        break;
        default: this.setState({expression: expression + '.'});
      }
    }
   }

   memorize = () => {    
     if(this.state.memory){
      let mk = document.getElementById('but');
      mk.children[2].innerText = validateMemory(this.state.memory)
     }
   }

   render(){
     const {expression, operand, operator} = this.state;
       return(
         <Fragment>
           <h1>MK-2019</h1>
           <div className='mk'>
              <div className='display'>
                  <div className='innerDisplay'>
                  <p className='expression'>{expression}</p>
                  </div>
                </div>
              <div className='controls'>
                 <div className='grid' id='but' onClick={this.handleClick}>                 
                 </div> 
                 <span>{operand[0]}</span> <span>{operator}</span> <span>{operand[1]}</span>            
            </div>
          </div>
         </Fragment>
   )
  }
}

export default App 


