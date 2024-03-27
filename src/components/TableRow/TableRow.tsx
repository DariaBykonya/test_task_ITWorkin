import { useEffect, useState } from "react";
import "./TableRow.scss";

interface TableRowProps {
  rowData: RowDataType;
}

interface RowDataType {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { 
    name: string,
    url: string
  };
  location: { 
    name: string,
    url: string 
  };
  image: string;
  episode: string[];
  url: string;
  created: string
}

export const TableRow: React.FC<TableRowProps> = ({ rowData }) => {

  const [residents, setResidents] = useState<string>("");
  const [episode, setEpisode] = useState<string>("");

  useEffect(() => {
    console.log(rowData);
  }, [])

  return (
    <tr className='table__row-body'>

      {rowData && Object.entries(rowData).map(([key, value]: [string, any], index) => (
        <td key={index}>
          {key === "image" ? (
            <img src={value} alt="Character" className="table__image"/>
          ) : key === "created" ? (
            new Date(value).toLocaleDateString("en-US")
          ) : key === "residents" && value.length !== 0 ? (
            <select value={residents} onChange={(e) => setResidents(e.target.value)} className='select'>
              {value.map((resident: string, index: number) => (
                <option key={index} value={resident}>{resident}</option>
              ))}
            </select>
          ) : key === "episode" ? (
            <select value={episode} onChange={(e) => setEpisode(e.target.value)} className='select'>
              {value.map((episode: string, index: number) => (
                <option key={index} value={episode}>{episode}</option>
              ))}
            </select>
          ) : key === "url" ? (
            <a href={value} className='table__url'>Reference</a>
          ) : value !== null && typeof value === 'object' ? (
            <div><a href={value.url} className='table__url'>{value.name}</a></div>
          ) : (
            value
          )}
        </td>
      ))}
    </tr>
  );
};