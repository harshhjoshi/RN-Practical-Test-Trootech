import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook for making API requests and handling loading and errors
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null); // Store fetched data
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(''); // Error message

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url); // Fetch data from the provided URL
        setData(response.data); // Set the fetched data
        setLoading(false); // Loading is complete
      } catch (err) {
        setError('Error fetching data'); // Set error message if request fails
        setLoading(false); // Loading is complete
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [url]); // Re-run the effect when the URL changes

  // Return the fetched data, loading state, and error message
  return { data, loading, error };
}

export default useApi;