import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';


const Increament = ({ stock }) => {

  const [clicks ,setClicks] = useState(1);
  const [show ,setShow] = useState(true);
  const [dec, setDec] = useState(false)
  const [inc, setInc] = useState(true)

  const IncrementItem = () => {
    if(clicks + 1 > stock){
      setClicks(stock)
      
    }else{
      setClicks(clicks + 1 );
    }
  }
  const DecreaseItem = () => {
    if(clicks - 1 < 1){
      setDec(false)
    }else{
      setClicks(clicks - 1 );
    }
  }
  const ToggleClick = () => {
    setShow(!show );
  }

  useEffect(() => {
    if(clicks === stock){
      setInc(false)
  
    }else{
      setInc(true)
    }

    if(clicks === 1){
      setDec(false)
    }else{
      setDec(true)
    }
  })
  
    return (
      <div style={{ display: 'flex', boxSizing: 'border-box' }}>
        <div >
          {
            dec === true &&
            <button style={{ borderRadius: '8px' , padding: '0px 10px', border: 'unset', outline: 'unset', backgroundColor: 'grey', marginRight: '10px' }} onClick={DecreaseItem}>
              <h2 >{'<'}</h2>
            </button> || <button style={{ opacity: 0.5, borderRadius: '8px' , padding: '0px 10px', border: 'unset', outline: 'unset', backgroundColor: 'grey', marginRight: '10px' }} onClick={DecreaseItem}>
              <h2 >{'<'}</h2>
            </button> 
          }
          
        </div>
        
        <div>
          { <h3 style={{ marginTop: '5px' }}>{'   ' + clicks + '   ' }</h3> }
        </div>

        <div>
          {
            inc === true && 
            <button style={{ borderRadius: '8px' , padding: '0px 10px', border: 'unset', outline: 'unset', backgroundColor: 'grey', marginLeft: '10px' }} onClick={IncrementItem}>
              <h2 >{'>'}</h2>
            </button> || <button style={{opacity: 0.5, borderRadius: '8px' , padding: '0px 10px', border: 'unset', outline: 'unset', backgroundColor: 'grey', marginLeft: '10px' }} onClick={IncrementItem}>
              <h2 >{'>'}</h2>
            </button>
          }
          
        </div>
        

        
      </div>
    );
}

export default Increament;