import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getAllCities, getWeatherData, updateCityWeather,
} from '@/utils';

const updateWeather = async (name:string, lat:number, lon:number, index:number) => {
  const temp = await getWeatherData(lat, lon);
  await updateCityWeather(name, temp);
  return { temp, index };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const expiration = parseInt(process.env.EXPIRATION_MILLISECONDS as string, 10);
    const cities = await getAllCities();

    const promises:any[] = [];

    cities.forEach((city, index) => {
      if (Date.now() - new Date(city.updatedAt as string).getTime() > expiration) {
        promises.push(updateWeather(city.name, city.lat, city.lon, index));
      }
    });

    const results = await Promise.all(promises);

    results.forEach(({ temp, index }) => {
      cities[index].currentWeather = temp;
    });

    return res.status(200).json(cities.map(({ name, currentWeather }) => ({ name, currentWeather })));
  } catch (err:any) {
    console.log(err);
    return res.status(500).json({
      error: err.message || 'API Error',
    });
  }
}
