import React from 'react';

import { makeStyles, Card, CardContent, Typography, CardMedia, Button } from '@material-ui/core';

//customize material-ui component
const useStyles = makeStyles({
    root: {
      maxWidth: 400,
      minWidth: 150,
      margin: 10
    },

    type: {
      fontFamily: 'Ubuntu'
    },

    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  });

//Item list component
const ItemList = (props) => {
    const classes = useStyles();

    if(props.displayItem.length > 0) {
        props.setLoaded(true);
          return (
                <div className="itemList">
                  {(props.displayItem).map(item => (
                        <Card className={classes.root} key={item.id}>
                          <CardContent>
                              <div>
                                  <span><div style={{ width:'20px', height:'20px', border:'none', borderRadius:'50%', backgroundColor:item.colour, boxShadow: '1px 3px 1px #9E9E9E' }}>
                                    </div></span>{item.colour} {item.type}
                              </div>                         
                              <Typography className={classes.typo}>
                                  PRICE $ {item.price}
                              </Typography>
                              <Typography className={classes.typo}>
                                  {item.inventory} item left
                              </Typography>
                              <CardMedia
                                  className={classes.media}
                                  image={item.image}            
                              />
                          </CardContent>
                          
                          <Button className="button" value={item.id} 
                              onClick={(event) => props.addToCart(event.currentTarget.value)}
                              disabled= {item.inventory > 0 ? false : true}
                              >
                                {item.inventory > 0 ? `Add to cart` : `Sold Out`} </Button>
                          
                        </Card> 
                      ))}
                      </div>    
                  )
              }
        
        //result message when there is no search result
        else {
           
          if(props.loaded) {
            return ( <h2>Sorry, no result found</h2> )
          }
          
          return ( <h2>Data loading...</h2>)
           
        }
      }
      
export default ItemList