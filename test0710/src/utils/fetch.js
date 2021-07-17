//fetch utility

//get method
export const getAll = url => fetch(url).then(async (res) => await res.json());

//post method
export const postPurchase = (url, data) => fetch(url, {
    'method': 'POST',
    'headers': {
        'Content-Type': 'application/json'
    },
    'body': JSON.stringify(data)
}).then( res => 
    window.location.reload()    
);