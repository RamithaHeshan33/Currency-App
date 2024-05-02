const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle wares
app.use(express.json());
app.use(cors());

//get Currencies
app.get("/getAllCurrencies", async (req,res) => {
    const nameURL = `https://openexchangerates.org/api/currencies.json?app_id=d066ba15a96345a68af34df1d3ad7740`;

    try{
        const nameResponse = await axios.get(nameURL);
        const nameData = nameResponse.data;

        return res.json(nameData);
    }
    catch(e) {
        console.log(e)
    }
})

//get the target amount
app.get("/convert", async (req, res) => { // <-- Corrected order of parameters (req, res)
    const {date, sourceCurrency, targetCurrency, amountInSourceCurrency} = req.query;

    try {
        const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=d066ba15a96345a68af34df1d3ad7740`
        
        const dataResponse = await axios.get(dataURL);
        const rates = dataResponse.data.rates;
        
        //rates
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        //final target value 
        const targetAmo = (targetRate / sourceRate) * amountInSourceCurrency;

        return res.json(targetAmo.toFixed(2));
    }
    catch(e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' }); // Return an error response
    }
});


//listen to a part
app.listen(5000, () => {
    console.log("Server Started");
});