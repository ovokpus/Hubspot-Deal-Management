import axios from 'axios';
import request from 'request';

const API_KEY = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
const companyId = '000000000000000'



const dealIdResponse = await axios(`https://api.hubapi.com/crm-associations/v1/associations/${companyId}/HUBSPOT_DEFINED/6?hapikey=${API_KEY}`);
const dealId = dealIdResponse.data.results[0];
console.log(dealId);
console.log(typeof dealId);

const dealStatsResponse = await axios(`https://api.hubapi.com/crm/v3/objects/deals/${dealId}/?hapikey=${API_KEY}`);
const dealStats = dealStatsResponse.data;
const parsedDealCloseDate = Date.parse(dealStats.properties.closedate);

//calculate
const date = new Date(parsedDealCloseDate);
const year = date.getFullYear() + 1; //calculated for new deal close date
const month = "0" + (date.getMonth() + 1);
const day = "0" + date.getDate();
const hours = "0" + (date.getHours() + 6);
const minutes = "0" + date.getMinutes();
const seconds = "0" + date.getSeconds();
const newDealCloseDate = year + '-' + month.slice(-2) + '-' + day.slice(-2) + 'T' + hours.slice(-2) + ':' + minutes.slice(-2) + ':' + seconds.slice(-2) + '.185Z';

console.log(newDealCloseDate);
console.log(typeof newDealCloseDate);



const options = {
    method: 'POST',
    url: 'https://api.hubapi.com/crm/v3/objects/deals',
    qs: { hapikey: API_KEY },
    headers: { 'Content-Type': 'application/json' },
    body: {
        associations: { associatedCompanyIds: [companyId] },
        properties: {
            amount: '85000.00',
            closedate: newDealCloseDate,
            dealname: 'Ovo Umbrella Corporation- Containment Blast Doors',
            dealstage: 'appointmentscheduled',
            pipeline: 'default'
        }
    },
    json: true
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});


