const express = require('express');
const {builder,respJson} = require('npmfedex');
const request = require('request');


const app = express()
const port = 3000



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const quote_params = {
    address_from:{
        zip: '72570',
        country: 'MX',
    },
    address_to:{
        zip: '93600',
        country: 'MX'
    },
    parcel:{
        length: 25.0,
        width: 28.0,
        height: 46.0,
        distance_unit: 'CM',
        weight: 6.5,
        mass_unit: 'KG'
    }
}

const body = builder( quote_params );
console.log(body)
request.post(
    {url:'https://wsbeta.fedex.com:443/xml',
    body : body,
    headers: {'Content-Type': 'application/xml'}
    },
    function (error, response, body) {        
        if (!error && response.statusCode == 200) {
            respJson(body);
        }else{
            console.log(error);
        }
    }
);



module.exports = app;