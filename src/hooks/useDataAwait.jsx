import { useState, useEffect } from "react";

const useDataAwait = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://hp-api.onrender.com/api/characters"
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const data = await response.json();
        if (!ignore) {
          let newData = [];
          let hasImageCount = 0;
          for (let index = 0; index < data.length; index++) {
            if (data[index].image == "") continue;
            newData.push(data[index]);
            hasImageCount++;
            if (hasImageCount >= 25) break;
          }
          setData(newData);
          setError(null);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => (ignore = true);
  }, []);

  return { data, error, loading };
};

export default useDataAwait;
