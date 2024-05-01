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

//listen to a part
app.listen(5000, () => {
    console.log("Server Started");
});