import { Console } from 'console';
import * as CommonConstants from '../../Constants';
import { Eventprops } from './Eventprops';

export const fetchEventData = async (lat: string, lon: string) => {
    const endpoint = `${CommonConstants.EVENTAPI}?&limit=${CommonConstants.EVENTAPI_LIMIT_SEARCH}&location_around.origin=${lat},${lon}&start_around.origin=2021-11-20T00:13:00Z&end_around.origin=2021-12-25T00:08:00Z&category=academic,sports,festivals&sort=-start`;
    let EventDetails: Eventprops[] = [];

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set(`Authorization`, `Bearer ${CommonConstants.EVENTAPI_AUTH_TOKEN}`);
    requestHeaders.set(`Accept`, `application/json`);

    await fetch(endpoint, { method: 'GET', headers: requestHeaders }).then(async (response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }
    }).then(async (responseJSON) => {
        await responseJSON.results.map(async function (item: any) {
            let event_dt_txt = item.start.split(/-|\s|\T|\Z|:/);
            let eventdate = event_dt_txt[1] + "-" + event_dt_txt[2] + "-" + event_dt_txt[0];
            let eventtime = event_dt_txt[3] + "-" + event_dt_txt[4] + "-" + event_dt_txt[5];

            let address = "-";
            let address_title = "-";
            if (item.entities.length > 0) {
                address = item.entities[0].formatted_address;
                address_title = item.entities[0].name;
            }
            EventDetails.push({
                category: item.category,
                title: item.title,
                address: address,
                address_title: address_title,
                startdate: eventdate,
                starttime: eventtime,
            })
        })
    }).catch(async (error) => {
        EventDetails = [];
    });

    return EventDetails;
}