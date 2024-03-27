import { useState } from "react";
import {TableRow} from "../TableRow/TableRow";
import './Table.scss'

interface TableProps {
  data: any[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };


  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const sortedData = sortBy
  ? [...currentItems].sort((a, b) => {
      const aValue = typeof a[sortBy] === "string" ? a[sortBy].toLowerCase() : a[sortBy];
      const bValue = typeof b[sortBy] === "string" ? b[sortBy].toLowerCase() : b[sortBy];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    })
  : currentItems;

  return (
    <div className='table-wrapper'>
      <table className='table'>
        <thead>
          <tr className='table__row-head'>
            {data.length > 0 && Object.keys(data[0]).map((key, index) => (
              <th key={index} 
                onClick={() => handleSort(key)}
              >
                {key}
                {sortBy === key && (
                  <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>
                )} 
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='table__body'>
          {sortedData.map((item, index) => (
            <TableRow key={index} rowData={item} />
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <button onClick={prevPage} disabled={currentPage === 1} className='pagination__per'></button>
        <span className='pagination__pages'><p className='pagination__current-page'>{currentPage}</p> / <p className='pagination__next-page'>{totalPages}</p></span>
        <button onClick={nextPage} disabled={currentPage === totalPages} className='pagination__next'></button>
      </div>
    </div>
  );
};

export default Table;