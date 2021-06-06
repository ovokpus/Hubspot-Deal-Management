/* https://www.npmjs.com/package/@hubspot/api-client */
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const API_KEY = "XXXXXXXXXXXXXXXXXXXXXXXXXXXX";
const companyId = '00000000000000000';

app.get('/companies', async (req, res) => {
    const companies = `https://api.hubapi.com/crm/v3/objects/companies/${companyId}/?hapikey=${API_KEY}`;
    try {
        const resp = await axios.get(companies);
        const data = resp.data;
        res.json(data);
    } catch (err) {
        console.error(err);
    }
});


function getDealId() {
    app.get('/deals', async (req, res) => {
        const deals = `https://api.hubapi.com/crm-associations/v1/associations/${companyId}/HUBSPOT_DEFINED/6?hapikey=${API_KEY}`;
        try {
            const resp = await axios.get(deals);
            const data = resp.data;
            return res.json(data.results[0]);
        } catch (err) {
            console.error(err);
        }
    });
}



app.get('/dealstats', async (req, res) => {
    const dealstats = `https://api.hubapi.com/crm/v3/objects/deals/${dealId}/?hapikey=${API_KEY}`;
    try {
        const resp = await axios.get(dealstats);
        const data = resp.data;
        res.json(data);
    } catch (err) {
        console.error(err);
    }
});





app.listen(3000, () => console.log('Listening on port 3000'));
