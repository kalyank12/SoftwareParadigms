import { Console } from 'console';
import * as CommonConstants from '../../Constants';
import { Placeprops } from './Placeprops';

export const fetchPlaceData = async (lat: string, lon: string) => {
    const endpoint = `${CommonConstants.PLACESAPI}&apiKey=${CommonConstants.PLACESAPIKEY}&filter=circle:${lon},${lat},3000`;
    let PlaceDetails: Placeprops[] = [];

    await fetch(endpoint).then(async (response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }
    }).then(async (responseJSON) => {
        console.log(responseJSON);
        await responseJSON.features.map(async function (item: any) {
            PlaceDetails.push({
                Name: item.properties.name,
                address_line1: item.properties.address_line1,
                address_line2: item.properties.address_line2,
            })
        })
    }).catch(async (error) => {
        PlaceDetails = [];
    });

    return PlaceDetails;
}