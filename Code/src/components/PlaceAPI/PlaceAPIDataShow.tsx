import { placedataprops } from "./Placeprops";

const PlacePopulateData: React.FC<placedataprops> = ({ placedata }) => (
    <div className="row">
        <div className="listing-places">
            {placedata.map((item) => (
                <div className="col-4">
                    <div className="places-data">
                        <div className="places-number-circle"> </div>
                        <div className="places-number"></div>
                        <div className="places-title">
                            <h5>{item.Name}</h5>
                        </div>
                        <div className="place-address">{item.address_line2}</div>
                    </div>
                </div>
            ))}
        </div >
    </div>
);

export default PlacePopulateData;

