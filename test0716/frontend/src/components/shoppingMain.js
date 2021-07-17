import React, { useState, useEffect } from 'react';

import { makeStyles, Snackbar, Button } from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import ItemList from './itemList'
import Cart from './cart'   
import SearchBar from './searchBar'   

import { getAll } from '../utils/fetch'

import './css/container.css';

//customize material-ui component
const useStyles = makeStyles({
    cartIcon : {
      fontSize: '30px',
      colors: '#232F34'
    }
});


const ShoppingMain = () => {
    
    const classes = useStyles();

    //backend endpoint url
    const URL = "http://localhost:5000/api/clothing"

    //data from backend
    const [data, setData] = useState([])
    const [displayItem, setDisplayItem] = useState([])
    
    //setting for cart
    const [cartVisible, setCartVisible] = useState(false)
    const [cartList, setCartList] = useState([])
    const cartVisibleChange = { display: cartVisible ? 'flex' : 'none' }

    //setting for cart button
    const [addCounting, setAddCounting] = useState(0)
    
    //setting for filter    
    const [filterOption, setFilterOption] = useState('Type')

    //settinf for error alert
    const [errorMessage, setErrorMessage] = useState('err')
    const [alertOpen, setAlertOpen] = useState(false)

    //data loading message
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        
        async function fetchData() {
            const dataList = await getAll(URL);
            
            setData(dataList);

            setDisplayItem(dataList);
        }

        fetchData();
      }, [])

    const cartVisibility = () => {
        
      document.body.style.overflow = 'hidden';
      setCartVisible(!cartVisible);        
    }


    const dbHandleChange = (value) => {
        
        var toLower = value.toLowerCase();
        var searchResult = [];
        
        if(filterOption === 'Type') {
        searchResult = data.filter(item => item['type'].toLowerCase().includes(toLower)); }

        else if(filterOption === 'Colour') {
        searchResult = data.filter(item => item['colour'].toLowerCase().includes(toLower)); }
                  
        setDisplayItem(searchResult);
    }

    //update cart state
    const addToCart = (value) => {
      
        var count = addCounting

        var qty = 0;
        const list = cartList

        const item = data.filter(item => item.id == value)
        
        const limit = item[0].inventory

        if(list[value] === undefined) {
            qty++;
            list[value] = {'qty': qty, data: item}
            setAddCounting(++count) 
        }

        else {
            
            qty = list[value].qty
            qty++;
            
            //check availability
            if(qty > limit) {
              setErrorMessage("Sorry you alreday have a miximum amount")
              openAlert()
            } 
            
            else {
              list[value].qty = qty            
              setAddCounting(++count) 
            }
        }
        setCartList(list);
    }

    //update qty of purcahse item
    const removeItem = (value) => {
      
      var counting = addCounting
      var updateCart = [...cartList];

      for(var i=0; i<updateCart.length; i++) {
        if(updateCart[i] == null) {
          delete updateCart[i]
        }
      }

      var qty = cartList[value].qty;
      qty--;
      setAddCounting(--counting)

      if(qty > 0)  {
        updateCart[value].qty = qty
      }

      else {
        delete updateCart[value]
      }
      
      setCartList(updateCart)
  }

  //update qty of purcahse item
  const addItem = (value) => {

      var counting = addCounting
      var updateCart = [...cartList];

      for(var i=0; i<updateCart.length; i++) {
        if(updateCart[i] == null) {
          delete updateCart[i]
        }
      }
      
      var limit = ((cartList[value]).data[0]).inventory
      
      var qty = cartList[value].qty;
      
      qty++;
      
      //check availability
      if(qty > limit) {
        setErrorMessage("Sorry you alreday have a miximum amount")
        openAlert()
      }

      else {
        updateCart[value].qty = qty  
        setAddCounting(++counting)
        setCartList(updateCart)
      }
  }

  //open alert snackbar
  const openAlert = () => {
    setAlertOpen(true);
  };  

  //close alert snackbar
  const handleClose = (event, reason) => {
    
    if (reason === 'clickaway') {
      setAlertOpen(false);
      return;
    }
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

    return (
        <div className="container">
            
          <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity="error">{errorMessage}</Alert>
          </Snackbar>

          <div className="fixedContainer">
            <div className="cartButton">
              <Button className="button" onClick={cartVisibility}><ShoppingCartIcon className={classes.cartIcon}/><span className="span">{addCounting > 0 ? addCounting : '' }</span></Button>
              
            </div>
              
            <h2>DigiLeague Shopping</h2>
              
            <SearchBar filterOption={filterOption} setFilterOption={setFilterOption} dbHandleChange={dbHandleChange} />
            </div>
            
            <ItemList addToCart={addToCart} displayItem={displayItem} loaded={loaded} setLoaded={setLoaded}/>
            
            <div className="cartPage" style={cartVisibleChange}>
                <Cart cartList={cartList} setCartList={setCartList} setCartVisible={setCartVisible} addItem={addItem} removeItem={removeItem} addCounting={addCounting} />
            </div>
        
        </div>
    ); 
       
  }

export default ShoppingMain