import React from 'react';

import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { makeStyles, Paper, Button } from '@material-ui/core';

import { postPurchase } from '../utils/fetch'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CloseIcon from '@material-ui/icons/Close';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

//customize material-ui component
const useStyles = makeStyles({
    table: {
      minWidth: 300      
    },

    cartIcon : {
        fontSize: 40,
        color: '#f9aa33',
        marginRight: 10,
        marginLeft: 20        
    },

    smallButton : {
        margin:0,
        padding:0,
    },

    cell: {
        textAlign:'center',
        margin:1
    },    
  });

//Cart component
const Cart = (props) => {
    
    const URL = "http://localhost:5000/api/clothing"
    
    const classes = useStyles();

    const getSubtotal = (qty, price) => {
        return qty*price;
    }

    const purchaseOrder = (data) => {
        
        const list = []
        data.map((row) => (
            list.push({id: row.data[0].id, qty: row.qty})
        ))
            
        postPurchase(URL, list);
    }

    const getSum = (data) => {
        
        var sum = 0;
        
        data.forEach(row => 
            
            sum += getSubtotal(row.qty, row.data[0].price)
        )

        return sum;
    }

    const closeCart = () => {
        document.body.style.overflow = 'auto'
        props.setCartVisible(false)
    }

    if(props.cartList.length > 0) {
        
        return (
        
        <Paper className="cartPaper">
            <Button className="closeButton" onClick={() => closeCart()}>
                <CloseIcon/>
            </Button>
            <div className="cartTitle">
            <ShoppingCartIcon className={classes.cartIcon}/><h3>DigiLeague Cart</h3>
            </div>
            <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell className={classes.cell}>Item</TableCell>
                    <TableCell className={classes.cell}>Price&nbsp;($)</TableCell>
                    <TableCell style={{textAlign:'left'}}>qty</TableCell>                    
                    <TableCell className={classes.cell}>Sum&nbsp;($)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="tablebody">
                    {props.cartList.map((row) => (
                    <TableRow key={row.data[0].id}>
                        <TableCell className={classes.cell}>{row.data[0].colour} {row.data[0].type}</TableCell>
                        <TableCell className={classes.cell}>{row.data[0].price}</TableCell>
                        <TableCell className={classes.cell}> 
                        <div style={{textAlign:'center', display:'flex', flexDirection:'row'}}>
                            <div style= {{alignSelf:'center'}}>
                                {row.qty} 
                            </div>
                            <div>
                                <Button className={classes.smallButton} value={row.data[0].id} onClick={(event) => props.addItem(event.currentTarget.value)}>
                                <AddCircleOutlineIcon/> </Button>
                                <Button className={classes.smallButton} value={row.data[0].id} onClick={(event) => props.removeItem(event.currentTarget.value)}>
                                <RemoveCircleOutlineIcon/> </Button>
                            </div>
                        </div>
                        </TableCell>
                        <TableCell className={classes.cell}>{ getSubtotal(row.qty, row.data[0].price) }</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            
            <div className="cartTotal">TOTAL $ { getSum(props.cartList)}</div>
            
            <Button className="button" onClick={() => purchaseOrder(props.cartList)}
                disabled= { props.addCounting > 0 ? false : true}
            >Place Order</Button>            
            
        </Paper>    
        )
    }

    return (
        <Paper className="cartPaper">
        <Button className="closeButton" onClick={() => closeCart()}>
            <CloseIcon/>
        </Button>
        <div className="cartTitle">
        <ShoppingCartIcon className={classes.cartIcon}/><h3>DigiLeague Cart</h3>
        </div>
        <div className="empty">
            <h4>Please add item to cart first</h4>       
        </div>
    </Paper>   
    )
}

export default Cart