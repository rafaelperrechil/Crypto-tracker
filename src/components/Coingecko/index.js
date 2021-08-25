import React from 'react';

const basicFetch = async (URL_API) => {
    return (await fetch(`${URL_API}`)).json();
}

export default{
    getAllCoins: async () => {
        return await basicFetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    }
}