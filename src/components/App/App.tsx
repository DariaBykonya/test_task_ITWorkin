import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../Table/Table";
import './App.scss';

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [api, setApi] = useState<string>("character");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/${api}`
        );
        setData(response.data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [api]);

  return (
    <section className="app">
      <header className='header'>
        <select value={api} onChange={(e) => setApi(e.target.value)} className='select'>
          <option value="character">Characters</option>
          <option value="location">Locations</option>
        </select>
      </header>
      {loading ? (
        <span className="loader"></span>
      ) : (
        <Table data={data} />
      )}
    </section>
  );
};

export default App;