import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createCity, getCity, getGeoData, getWeatherData, updateCityWeather,
} from '@/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const expiration = parseInt(process.env.EXPIRATION_MILLISECONDS as string, 10);
    const { query } = req;

    const { city: name } = query;

    if (!name) return res.status(200).json({ error: 'Must include name query param' });

    const dbRecord = await getCity(name as string);

    // City not in DB
    if (!dbRecord) {
      const { lat, lon } = await getGeoData(name as string);
      const currentWeather = await getWeatherData(lat, lon);

      const cityData = await createCity({
        name: name as string,
        currentWeather,
        lat,
        lon,
      });

      return res.status(200).json({ name, currentWeather: cityData.currentWeather });
    }

    // Weather data is stale
    if (Date.now() - new Date(dbRecord.updatedAt as string).getTime() > expiration) {
      const temperature = await getWeatherData(dbRecord.lat, dbRecord.lon);
      await updateCityWeather(name as string, temperature);
      return res.status(200).json({ name, currentWeather: temperature });
    }

    // Valid weather data in db
    return res.status(200).json({ name, currentWeather: dbRecord.currentWeather });
  } catch (err:any) {
    console.log(err);
    return res.status(500).json({
      error: err.message || 'API Error',
    });
  }
}
