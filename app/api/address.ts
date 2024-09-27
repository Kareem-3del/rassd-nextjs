import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export interface District {
    district_id: number;
    city_id: number;
    region_id: number;
    name_ar: string;
    name_en: string;
}

export interface City {
    city_id: number;
    region_id: number;
    name_ar: string;
    name_en: string;
    center: [number, number];
}

export interface Region {
    region_id: number;
    capital_city_id: number;
    code: string;
    name_ar: string;
    name_en: string;
    population: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req;

    const districtsPath = path.join(process.cwd(), 'data', 'districts.json');
    const citiesPath = path.join(process.cwd(), 'data', 'cities.json');
    const regionsPath = path.join(process.cwd(), 'data', 'regions.json');

    const districts: District[] = JSON.parse(fs.readFileSync(districtsPath, 'utf8'));
    const cities: City[] = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));
    const regions: Region[] = JSON.parse(fs.readFileSync(regionsPath, 'utf8'));

    let data = { districts, cities, regions , query_ : query};

    // Search functionality
    if (query.search) {
        const searchTerm = String(query.search).toLowerCase();
        const regionId = Number(query.regionId);
        data.query_ = query;
        const cityId = Number(query.cityId);
        if(regionId){
            data.cities = cities.filter(city => city.region_id === regionId);
        }
        if(cityId){
            data.districts = districts.filter(district => district.city_id === cityId);
        }
        data.districts = districts.filter(district =>
            district.name_en.toLowerCase().includes(searchTerm) ||
            district.name_ar.toLowerCase().includes(searchTerm)
        );

        data.cities = cities.filter(city =>
            city.name_en.toLowerCase().includes(searchTerm) ||
            city.name_ar.toLowerCase().includes(searchTerm)
        );

        data.regions = regions.filter(region =>
            region.name_en.toLowerCase().includes(searchTerm) ||
            region.name_ar.toLowerCase().includes(searchTerm)
        );


    }

    res.status(200).json(data);
}
