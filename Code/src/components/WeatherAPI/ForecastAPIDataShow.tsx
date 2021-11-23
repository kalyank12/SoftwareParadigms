import { forecastdataprops } from "./Weatherprops";
import weatherimage from '../../../src/Images/weather.jpg';

const ForecastPopulateData: React.FC<forecastdataprops> = ({ forecastdata }) => (
    <div className="row">
        {forecastdata.map((item) => (
            <div className="col-4">
                <div className="card" style={{ marginBottom: "20px" }}>
                    <img src={weatherimage} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{item.date_txt}</h5>
                        <p className="card-text uppercase">{item.description}</p>
                        <div className="temprature-block">
                            <ul className="temprature">
                                <li>Max</li>
                                <li>Min</li>
                                <li>Feels Like</li>
                                <li>{item.temp_max} °F</li>
                                <li>{item.temp_min} °F</li>
                                <li>{item.feels_like} °F</li>
                            </ul>
                        </div>
                        <p className="card-text"><small className="text-muted">Humidity: {item.humidity}</small></p>
                    </div>
                </div>
            </div>
        ))}
    </div >
);

export default ForecastPopulateData;

