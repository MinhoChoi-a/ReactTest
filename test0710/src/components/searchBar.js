import React from 'react';

import { makeStyles, FormControl, Select, TextField, MenuItem, InputLabel } from '@material-ui/core';

//customize material-ui component
const useStyles = makeStyles({
    option: {
      fontFamily: 'Ubuntu',
      width:'100%'
    }
});

//Search Bar Component
const SearchBar = (props) => {
    
    const classes = useStyles();

    return (
            <div className={"searchBar"}>
                <FormControl className="option">
                    <InputLabel id="demo-simple-select-label">Option</InputLabel>
                    <Select className={classes.option} 
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.filterOption}
                        onChange={(event) => props.setFilterOption(event.target.value)}
                        >
                        <MenuItem value={'Type'} className={classes.option} >TYPE</MenuItem>
                        <MenuItem value={'Colour'} className={classes.option} >COLOUR</MenuItem>
                    </Select>
                </FormControl>
                <form className={"search"} noValidate autoComplete="off">
                    <TextField className={classes.option} 
                        id="standard-basic" label="Search" 
                        onChange={(event) => props.dbHandleChange(event.target.value)}
                        />
                </form>
            </div>
        )
}

export default SearchBar