import { useState, useEffect } from 'react';
import {City, District, Region} from "@/app/api/address";
import {toast} from "sonner";

const useAddressSearch = (searchTerm : string , regionId? : number , cityId? : number) => {
    const [data, setData] = useState<{
        districts: District[];
        cities: City[];
        regions: Region[];
    }>({ districts: [], cities: [], regions: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/cities?search=${encodeURIComponent(searchTerm)}&regionId=${regionId}&cityId=${cityId}`);

                if (!response.ok) {
                    toast.error('An error occurred while fetching the data.');
                }

                const result = await response.json();
                setData(result);
            } catch (err : any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (searchTerm) {
            fetchData().then(console.log);
        } else {
            fetchData().then(console.log);
            // Reset data if there's no search term
            setData({ districts: [], cities: [], regions: [] });
            setLoading(false);
        }
    }, [searchTerm, regionId, cityId]);

    return { data, loading, error };
};

export default useAddressSearch;
