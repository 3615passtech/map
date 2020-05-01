import React from 'react'
import './App.css'

import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngTuple } from 'leaflet'

interface Bootcamp {
  name: string;
  position: LatLngTuple | string;
}

const bootcamps: Bootcamp[] = require('./bootcamps.json');

const App = () => (
  <div className="App">
    <BootcampMap items={bootcamps} />
    <Header count={bootcamps.length} />
  </div>
)

const mapCenterPosition: LatLngTuple = [48.85717, 2.34293]
const mapZoom: number = 12.5

const BootcampMap = (props: {items: Bootcamp[]}) => (
  <Map center={mapCenterPosition} zoom={mapZoom}>
    <TileLayer
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {props.items.map(x =>
      <Marker position={getGeoloc(x.position)}>
        <Popup>
          {x.name}
        </Popup>
      </Marker>
    )}
  </Map>
)
// Note: instead of GGMAP API, we could directly use directly from OSM : https://github.com/k4r573n/leaflet-control-osm-geocoder
const getGeoloc = (address: LatLngTuple | string): LatLngTuple => {
  if (typeof address === "string") {
    // https://developers.google.com/maps/documentation/geocoding/
    const key = "***************************************" // TODO: add restrict on API KEY (with the URL) https://console.cloud.google.com/apis/credentials/key/5d606920-bf8b-4691-b332-7bef15f4127d?project=bubbleis-jeu2cordes 
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + key
    // TODO: https://fr.reactjs.org/docs/faq-ajax.html
    return [0, 0]
  }
  return address
}

const Header = (props: {count: number}) => (
  <div className="title-container">
    <h1>{props.count} bootcamps à Paris!</h1>
  </div>
)

export default App