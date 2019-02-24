const request = require('request')
const fs = require('fs')

const size = 30000 // As of feb, 2019, there were 24607 parks. Up this number as needed.
request(
  {
    url: `https://www.recreation.gov/api/search?size=${size}`,
    json: true
  },
  function(err, response, body) {
    console.log(`Processed ${body.length} parks`)
    const parks = body.results.map(({ entity_id, name, latitude, longitude }) => {
      return {
        id: entity_id,
        name,
        latitude: parseFloat(latitude) || 0,
        longitude: parseFloat(longitude) || 0
      }
    })
    fs.writeFileSync('src/parks.json', JSON.stringify(parks, null, 2))
  }
)
