import React from 'react';
function Split(props){
      const {split} = props;
      const displaySplit = split.map( item => {
          return(
              <div key = {item.id }>
                <span className='split-title'>Varv{item.id}: </span><span className='split-items'>{item.hour + ':' + item.minut + ':' + item.sec + ':' + item.milSec}</span><hr/>
              </div>
          )});  
    

        return(
            <div>
                {displaySplit}
            </div>
        )
    
}
export default Split;
