import { eventdataprops } from "./Eventprops";
import academic from '../../Images/academic.png';
import sports from '../../Images/Sports.png';

const EventPopulateData: React.FC<eventdataprops> = ({ eventdata }) => (
    <div className="row">
        {eventdata.map((item) => (
            <div className="col-6">
                <div style={{ marginBottom: "30px" }}>
                    <div className="list-group-item list-group-item-action flex-column align-items-start active">
                        <div className="d-flex w-100 justify-content-between eventlist-title">
                            <h5 className="mb-1 uppercase">{item.title} ({item.category})</h5>
                            <small>{item.startdate}</small>
                            {/* <small>{item.startdate}, {item.starttime}</small> */}
                        </div>
                        <hr/>
                        <h6>{item.address_title}</h6>
                        <small>{item.address}</small>
                    </div>
                </div>

                {/* <div className="eventsec">
                    <div className="eventsec1">{item.startdate}, {item.starttime}</div>
                    <div className="eventsec2">hhhhhhhhhhhhhhhhhhhhhh</div>
                    <div className="eventsec1"></div>
                </div> */}
            </div>
        ))}
    </div >
);

export default EventPopulateData;

