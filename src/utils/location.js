import axios from 'axios';
export const MAP_KEY = 'AIzaSyAomkkJKfTlE9WOc_yMt2btwNjzkLSjqw0'
export const MAP_API_PLACE = 'https://maps.googleapis.com/maps/api/geocode/'

export const getLocation = async () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position)
      },
      error => {
        reject(error.message)
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    )
  })

export const getMyAddres = async (location) =>
  new Promise(async (resolve, reject) => {
    try {
      const urlToFetch = `${MAP_API_PLACE}json?latlng=${location.latitude},${location.longitude}&key=${MAP_KEY}`;
      const response = await axios.get(urlToFetch)
      return new resolve(response);
    } catch (error) {
      return new reject(error);
    }
  })