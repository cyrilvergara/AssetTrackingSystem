import { useState, useEffect } from 'react';

export const useFetch = (url) => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
   
   useEffect(() => {
      fetch(url)
         .then((response) => response.json())
         .then((data) => {
         if (data.success) {
            setData(data.data);
         } else {
            console.error(`Failed to fetch ${url}:`, data.error);
         }
         })
         .catch((error) => console.error(`Failed to fetch ${url}:`, error))
         .finally(() => setLoading(false));
   }, [url]);
   
   return { data, loading };
};