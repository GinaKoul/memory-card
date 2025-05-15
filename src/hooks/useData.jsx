import { useState, useEffect } from "react";

const useData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    fetch("https://hp-api.onrender.com/api/characters")
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((data) => {
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
        }
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

    return () => (ignore = true);
  }, []);

  return { data, error, loading };
};

export default useData;
