import { citiesModel } from './postgres';

interface City {name:string, currentWeather:number, lat:number, lon:number, updatedAt?:string}

const getCity = async (city:string) : Promise<City | null> => {
  const data = await citiesModel.findByPk(city as string);
  return data?.toJSON() || null;
};

const getAllCities = async ():Promise<City[]> => {
  const data:any = await citiesModel.findAll({ raw: true });
  return data as City[];
};

const createCity = async (city:City) => {
  const newCity = await citiesModel.create({
    name: city.name,
    currentWeather: city.currentWeather,
    lat: city.lat,
    lon: city.lon,
  });

  return newCity?.toJSON();
};

const removeCity = async (city:string) => {
  await citiesModel.destroy({ where: { name: city } });
};

const updateCityWeather = async (city:string, temperature:number) => {
  await citiesModel.update({ currentWeather: temperature }, { where: { name: city } });
};

const getGeoData = async (city:string) : Promise<{lat:number, lon:number}> => {
  const response = await fetch(`${process.env.OPEN_WEATHER_URL}/geo/1.0/direct?q=${city}&appid=${process.env.APP_ID}`);

  if (!response.ok) {
    throw new Error(`error fetching lat/long for city ${city}`);
  }

  const coordinates = await response.json();

  const lat = coordinates?.[0]?.lat;
  const lon = coordinates?.[0]?.lon;

  return { lat, lon };
};

const getWeatherData = async (lat:number, lon:number) : Promise<number> => {
  const response = await fetch(`${process.env.OPEN_WEATHER_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.APP_ID}`);

  if (!response.ok) {
    throw new Error(`error fetching weather for lat:${lat} lon:${lon}`);
  }

  const weather = await response.json();
  const temp = weather?.main?.temp;

  return temp;
};

export {
  getCity, createCity, removeCity, updateCityWeather, getGeoData, getWeatherData, getAllCities,
};
