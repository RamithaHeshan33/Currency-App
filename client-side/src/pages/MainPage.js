import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function MainPage() {
  // states for the form fields
  const [date, setDate] = useState("");
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);

  // handleSubmit method
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.get(
        "http://localhost:5000/convert", {
          params: {
            date,
            sourceCurrency,
            targetCurrency,
            amountInSourceCurrency,
          },
        },
      );

      setAmountInTargetCurrency(response.data);

    } catch (e) {
      console.log(e)
    }
  };

  // get currency names
  useEffect(() => {
    const getCurrencyNames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/getAllCurrencies"
        );
        setCurrencyNames(response.data)
      } catch (e) {
        console.log(e)
      }
    };
    getCurrencyNames();
  }, []);

  return (
    <div>
      <h1 className='lg:mx-32 text-5xl font-bold text-purple-400'>
        Currency Converter
      </h1>

      <p className='lg:mx-32 opacity-40 py-6 text-justify'>
        Introducing "Currency Converter"! This web app allows you to easily convert any currencies based on the latest exchange rates.
        You can easily do the conversions that you need through this web app. All you have to do is select a date, select a source 
        currency and a target currency, And you can give some value and press the "Get The Target Currency" button. Then you will be able to see the relevant Target Amount.
      </p>

      <div className='mt-5 flex items-center justify-center flex-col'>
        <section className='w-full lg:w-1/2'>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
              <input onChange={(e) => setDate(e.target.value)}
                type="date" id="date" name="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-400 focus:border-purple-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-400 dark:focus:border-purple-400"
                required />
            </div>
            <div className="mb-4">
              <label htmlFor="sourceCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source Currency</label>
              <select onChange={(e) => setSourceCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-400 focus:border-purple-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-400 dark:focus:border-purple-400"
                id="sourceCurrency"
                value={sourceCurrency}>
                <option value="">Select Source Value</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className='p-1' key={currency} value={currency}>{currencyNames[currency]}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="targetCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency</label>
              <select onChange={(e) => setTargetCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-400 focus:border-purple-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-400 dark:focus:border-purple-400"
                id="targetCurrency"
                value={targetCurrency}>
                <option value="">Select Target Value</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className='p-1' key={currency} value={currency}>{currencyNames[currency]}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="amountInSourceCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Amount in Source Currency</label>
              <input onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                type="number" id="amountInSourceCurrency" name="amountInSourceCurrency" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-400 focus:border-purple-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-400 dark:focus:border-purple-400"
                placeholder='Amount in Source Currency'
                required />
            </div>
            <button className='bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 font-medium rounded-md mt-4'>
              Get The Target Currency</button>
          </form>
        </section>
      </div>
      <section className='lg:mx-32 mt-8' >
        <span className='text-purple-500'>{amountInSourceCurrency}</span> {currencyNames[sourceCurrency]} is equal to {" "}
        <span className='text-purple-500'>{amountInTargetCurrency}</span> in {currencyNames[targetCurrency]} on {" "}
        <span className='text-purple-500'>{date}</span>
      </section>
    </div>
  )
}
