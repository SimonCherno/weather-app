import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useAppContext } from '../context/AppProvider';
import { makeStyles, createStyles } from '@mui/styles';
import { Popper } from '@mui/material';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& .MuiAutocomplete-listbox": {
        color: "var(--clr-font)",
        backgroundColor: "var(--clr-bcg)"
      },
      "& .MuiPaper-root": {
        backgroundColor: "var(--clr-bcg)",
        "& .MuiAutocomplete-noOptions": {
          color: "var(--clr-font)"
        }
      }
    }
  })
);
const CustomPopper = function (props) {
  const classes = useStyles();
  return <Popper {...props} className={classes.root}  />;
};
export default function ComboBox() {
  const {
    searchSuggestions, 
    input, 
    setInput, 
    setCurrentCity, 
    currentCity, 
    setIsTextError
  } = useAppContext();
  const handleInput = (event) => {
    if (/^[a-zA-Z\s]*$/.test(event)){
      setInput(event);
      setIsTextError(false);
    } else {
       setIsTextError(true);
    }
  }
  return <>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={searchSuggestions}
      sx={{ 
        width: 250,
        "& .MuiAutocomplete-inputRoot": {
          color: "var(--clr-font)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--clr-font)"
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--clr-font)"
          },
        },
        "& .MuiInputLabel-root": {
          color: "var(--clr-font)",
        },
        "& .MuiButtonBase-root": {
          color: "var(--clr-font)"
        },
      }}
      value={currentCity}  
      onChange={(_,city) => city && setCurrentCity(city)}
      inputValue={input}
      onInputChange={(_, value) => {
        handleInput(value);  
      }}
      renderInput={(params) => <TextField {...params} label="City" />}
      PopperComponent={CustomPopper}
    />
  </>
}