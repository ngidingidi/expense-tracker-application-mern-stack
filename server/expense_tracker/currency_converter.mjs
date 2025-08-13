import Freecurrencyapi from '@everapi/freecurrencyapi-js';

const API_KEY = "fca_live_yjKUhJoEasZje0b9YojNNtHw05V4zzP8v8knMXee"

const freecurrencyapi = new Freecurrencyapi(API_KEY);

freecurrencyapi.latest({
        base_currency: 'USD',
        currencies: 'EUR'
    }).then(response => {
        console.log(response);
    });
    