import React, { useState } from 'react';
import * as forecastapi from './components/WeatherAPI/ForecastAPI';
import ForecastPopulateData from './components/WeatherAPI/ForecastAPIDataShow';
import { forecastprops } from './components/WeatherAPI/Weatherprops';
import * as eventapi from './components/EventAPI/EventAPI';
import EventPopulateData from './components/EventAPI/EventAPIDataShow';
import { Eventprops } from './components/EventAPI/Eventprops';
import * as placeapi from './components/PlaceAPI/PlaceAPI';
import PlacePopulateData from './components/PlaceAPI/PlaceAPIDataShow';
import { Placeprops } from './components/PlaceAPI/Placeprops';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import '../src/CSS/Style.css';
import dayplannerImage from '../src/Images/Dayplanner.jpg';

function App() {
  const [zipcodeNumber, setZipcodeNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ForecastDataFromAPI, setForecastDataFromAPI] = useState<forecastprops[]>([]);
  const [IsForecastDataset, setIsForecastDataset] = useState(false);
  const [EventDataFromAPI, setEventDataFromAPI] = useState<Eventprops[]>([]);
  const [IsEventDataset, setIsEventDataset] = useState(false);
  const [PlaceDataFromAPI, setPlaceDataFromAPI] = useState<Placeprops[]>([]);
  const [IsPlaceDataset, setIsPlaceDataset] = useState(false);

  const getOnBlurInputValue = (event: any) => {
    setZipcodeNumber(event.target.value);
  };

  const startLoading = async () => {
    setLoading(true);
    setForecastDataFromAPI([]);
    setIsForecastDataset(false);
    setEventDataFromAPI([]);
    setIsEventDataset(false);
    setPlaceDataFromAPI([]);
    setIsPlaceDataset(false);

    let forecast_citydata = await forecastapi.fetchForecastData(zipcodeNumber);
    setForecastDataFromAPI(forecast_citydata.length > 0 ? forecast_citydata[0].forecastdata : []);
    setIsForecastDataset(true);
    let lat = "";
    let lon = "";
    if (forecast_citydata.length > 0) {
      lat = forecast_citydata[0].citydata[0].lat;
      lon = forecast_citydata[0].citydata[0].lon;
    }
    let eventdata = await eventapi.fetchEventData(lat, lon);
    setEventDataFromAPI(eventdata);
    setIsEventDataset(true);
    let placedata = await placeapi.fetchPlaceData(lat, lon);
    setPlaceDataFromAPI(placedata);
    setIsPlaceDataset(true);
    setLoading(false);
  }

  return (
    <div className="App">
      <header style={{ marginBottom: "30px" }} >Day Planner</header>
      <div className="container" style={{ marginBottom: "30px" }}>
        <div className="row ">
          <div className="col-sm">
            <input id="zipcode" className="form-control" type="number" placeholder="Enter 'zip code'" min="5" max="5" onBlurCapture={e => getOnBlurInputValue(e)} />
          </div>
          <div className="col-sm">
            <Button className='btn showallbutton' onClick={() => startLoading()}> Search </Button>
          </div>
          <div className="col-sm">
            {loading && 
              <p>Loading Data....</p>
            )}
          </div>
        </div>
      </div>


      <section className="about-home">
        <div className="container">
          <div className="about-text title">
            <h2 className="pageheading">Day Planner</h2>
            <p>Do you ever find yourself with slightly mixed emotions about the holiday season as it inches closer and closer? On one hand, you love absolutely everything about it – yet, on the other, you’re nervously bracing for your busiest time of the year. We’ve been there, and we’re here to tell you that there’s a solution that works time and time again: Planning Ahead. We are here to planning your year, your month, your week, and ultimately your day! We encourage you (starting today!) to combat this feeling by planning ahead. We’ve rounded up our favorite holiday tasks that you can tackle in November to create a season filled with less stress, more joy, and plenty of time for family, friends, and YOU!
            </p>
          </div>
          <div className="about-img">
            <img src={dayplannerImage} />
          </div>
          <div className="clear"></div>
        </div>
      </section>


      {!loading && IsForecastDataset && (
        <section className="WeatherSection">
          <div className="container ">
            <div className="row ">
              <div className="col-sm" >
                <div>
                  <div className="title">
                    <h2 className="pageheading text_center">Weather</h2>
                  </div>
                  {ForecastDataFromAPI.length != 0 ? (
                    <ForecastPopulateData
                      forecastdata={ForecastDataFromAPI}
                    />
                  ) : 
                    <div>No city found!!!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )
      }

      {!loading && IsEventDataset && (
        <section className="EventSection">
          <div className="container ">
            <div className="row ">
              <div className="col-sm" >
                <div>
                  <div className="title">
                    <h2 className="pageheading text_center">Events</h2>
                  </div>
                  {EventDataFromAPI.length != 0 ? (
                    <EventPopulateData
                      eventdata={EventDataFromAPI}
                    />
                  ) : 
                    <div>No event found!!!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )
      }

      {!loading && IsPlaceDataset && (
        <section className="PlaceSection">
          <div className="container ">
            <div className="row ">
              <div className="col-sm" >
                <div>
                  <div className="title">
                    <h2 className="pageheading text_center">Attractions</h2>
                  </div>
                  {PlaceDataFromAPI.length != 0 ? (
                    <PlacePopulateData
                      placedata={PlaceDataFromAPI}
                    />
                  ) : 
                    <div>No place found!!!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      }

      <div className="copyright">
        © 2021 Day Planner - Designed By <a target="_blank" rel="nofollow" href="#">Group2 Design Pvt. Ltd.</a>
      </div>
    </div >
  );
}

export default App;
