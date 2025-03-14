import TextField from '@mui/material/TextField';

export default function Input({handleInput , city}){
   
    
    return (
            <TextField id="outlined-basic" label="City name" variant="outlined"  onChange={handleInput} value={city} required/>
    )
}