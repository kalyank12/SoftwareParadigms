import { eventdataprops } from "./Eventprops";

const EventPopulateData: React.FC<eventdataprops> = ({ eventdata }) => (
    <div className="row">
        {eventdata.map((item) => (
            <div className="col-6">
                <div style={{ marginBottom: "30px" }}>
                    <div className="list-group-item list-group-item-action flex-column align-items-start active">
                        <div className="d-flex w-100 justify-content-between eventlist-title">
                            <h5 className="mb-1 uppercase">{item.title} ({item.category})</h5>
                            <small>{item.startdate}</small>
                        </div>
                        <hr/>
                        <h6>{item.address_title}</h6>
                        <small>{item.address}</small>
                    </div>
                </div>
            </div>
        ))}
    </div >
);

export default EventPopulateData;

