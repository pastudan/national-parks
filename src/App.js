import React, { Component } from 'react'
import './App.css'
import parks from './parks.json'
import ReactMapGL, { Marker } from 'react-map-gl'
const mapboxApiAccessToken =
  'pk.eyJ1IjoicGFzdHVkYW4iLCJhIjoiY2pybDR2eWNyMDR0cTN5dDJocTJ0bWltbCJ9.YFUKFpu2vkax0Yi-gcmDyw'

class App extends Component {
  state = {
    query: '',
    selectedParks: [],
    viewport: {
      altitude: 1.5,
      bearing: 0,
      height: 400,
      latitude: 37.1540752432573,
      longitude: -96.01601320132923,
      maxPitch: 60,
      maxZoom: 24,
      minPitch: 0,
      minZoom: 0,
      pitch: 0,
      width: 600,
      zoom: 2.6
    }
  }

  render() {
    const { query, selectedParks, viewport } = this.state

    const filteredParks = parks.filter(park => park.name.toLowerCase().includes(query))

    console.log(filteredParks)

    return (
      <div className="App">
        <input type="text" onChange={e => this.setState({ query: e.target.value })} />
        <div className="parks">
          {query !== ''
            ? filteredParks.slice(0, 10).map(park => {
                return (
                  <div
                    onClick={() => {
                      selectedParks.push(park)
                      this.setState({ selectedParks })
                    }}
                    className="park"
                  >
                    {park.name}
                  </div>
                )
              })
            : null}
        </div>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={mapboxApiAccessToken}
          onViewportChange={viewport => this.setState({ viewport })}
        >
          {filteredParks.map(park => (
            <Marker latitude={park.latitude} longitude={park.longitude}>
              <div className="marker" />
            </Marker>
          ))}
        </ReactMapGL>
        <h2>Selected Parks</h2>
        <div>
          {selectedParks.map(park => (
            <div>{park.name}</div>
          ))}
        </div>
        <h2>Selected Park Ids</h2>
        <div>{selectedParks.map(park => park.id).join(' ')}</div>
      </div>
    )
  }
}

export default App
