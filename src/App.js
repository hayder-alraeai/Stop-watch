import React from 'react';
import Split from './split';
class App extends React.Component{
  constructor(){
    super();
    this.state ={
      sec:0,
      milSec:0 ,
      minut:0,
      hour:0,
      start: false,
      startButton: 'Start',
      split:[]
    }
  }
  //det här functionen startar räkningen
handleStart = () => {
  let hour = this.state.hour;
  let minut = this.state.minut;
  let milSec = this.state.milSec;
  let sec = this.state.sec;
      milSec += 1;
      if(milSec === 10){           //10 mil seconds
        sec +=1;
        this.setState({sec});
        milSec =0;
        this.setState({milSec});
        if(sec === 60){            //60 seconds
          minut += 1;
          this.setState({minut});
          sec =0;
          this.setState({sec});
          milSec = 0;
          this.setState({milSec});
          if(minut === 60){          //condition in case 60 minuts
            hour += 1;
            this.setState({hour});
            minut = 0;
            this.setState({minut});
            sec =0;
            this.setState({sec});
            milSec = 0;
            this.setState({milSec});
          }
        }
      }
      this.setState({milSec});      //reset miliseconds
}
// controll function
handleControll = () => {
//Create an interval ID to be able to stop the interval
  if(this.state.start !== true){
    this.intervalID = setInterval(this.handleStart, 100);
    this.setState({start:true, startButton:'Pause'});
  }
  else{
    clearInterval(this.intervalID);
    this.setState({start:false, startButton:'Continue'}); 
  }
}
//handle reset function
handleReset = () => {
  clearInterval(this.intervalID); //in case reset is needed without pressing pause!!
  this.setState({sec:0, milSec:0, minut:0,hour:0, start:false, startButton:'Start', split:[]});
} 
//split function
handleSplit = () =>{
  let id = 0;
  let arr = this.state.split; //här lagrar jag split arrayen i variable arr så att loopa igenom det och skapa id som öker parallelt med antal objekt
  for(let i = 1; i < arr.length + 2; i++){ id = i} //jag plussade length med två eftersom första två loop är length lika med nol så det blir false
  this.state.split.push({id:id,hour:this.state.hour,minut:this.state.minut,sec:this.state.sec,milSec:this.state.milSec}); //här lägger jag objeket vid varje kick.
  
}
  render(){
    let minut = this.state.minut;
    let sec = this.state.sec;
    let milSec = this.state.milSec;   //lagrar elementerna i variable så att kunna få bättre strucktur
    let hour = this.state.hour;       //skapade componenten för att det blev för mycket kod här. 
    return(
      <div>
            <header>
                <span className='logo'>Stop Watch</span>
           </header>
           <div className='container'>
               <div className='content'>
                      <div className='display'>
                            <span className='minut'>{hour}</span>:
                            <span className='minut'>{minut}</span>:
                            <span className='secunds'>{sec}</span>:
                            <span className='mlsec'>{milSec}</span>
                      </div>
                      <div className='buttonContainer'>
                            <button onClick={()=>{this.handleControll()}}>{this.state.startButton}</button>
                            <button onClick={()=> {this.handleReset()}} >Reset</button>
                            <button onClick={()=> {this.handleSplit()}} >Split</button>
                      </div>
                      <div className='split-parent'>
                           <p>Split:</p>
                           <div className='split-display'>
                                <hr/>
                               <Split split = {this.state.split} /> 
                          </div>
                      </div>
               </div>
            </div>
            <div className='footer'>
               <p> All Rights Reserved &copy; Hayder Alraeai 2019</p>
           </div>
      </div>
    )
  }
}

export default App;
