import { NextResponse, NextRequest } from "next/server";
import path from "path";
import fs from "fs";
import { City, District } from "@/app/api/address";

export async function GET(request: NextRequest) {
  const citiesPath = path.join(process.cwd(), 'data', 'cities.json');
  const districtsPath = path.join(process.cwd(), 'data', 'districts.json');

  const districts: District[] = JSON.parse(fs.readFileSync(districtsPath, 'utf8'));
  const cities: City[] = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));

  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('search')?.toLowerCase() || '';
  const regionId = url.searchParams.get('regionId') || '';
    const cityId = url.searchParams.get('cityId') || '';
  let data : {
    districts: District[],
    cities: City[],
  } = { districts: [], cities: [] };

  if(regionId){
    data.cities = cities.filter(city => city.region_id === Number(regionId));
  }else {
    data.cities = cities;
  }
    if(cityId){
        data.districts = districts.filter(district => +district.region_id === Number(regionId));
        data.districts = districts.filter(district => district.city_id === Number(cityId));
        if(data.districts.length === 0){
            data.districts = districts.filter(district => district.region_id === Number(regionId));
        }
    }else{
        data.districts = districts;
    }
  if (searchTerm) {
    data.districts = data.districts.filter(district =>
        district.name_en.toLowerCase().includes(searchTerm) ||
        district.name_ar.toLowerCase().includes(searchTerm)
    ).slice(0, 10); // Limit to 10 results

    data.cities = data.cities.filter(city =>
        city.name_en.toLowerCase().includes(searchTerm) ||
        city.name_ar.toLowerCase().includes(searchTerm)
    ).slice(0, 10); // Limit to 10 results
  } else {
    data.districts = data.districts.slice(0, 10); // Get first 10 if no search term
    data.cities = data.cities.slice(0, 10); // Get first 10 if no search term
  }

  return NextResponse.json(data, { status: 200 });
}
