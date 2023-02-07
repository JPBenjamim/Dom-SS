import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import {axiosApi} from '../../services/axios';

import TableRow from './TableRow';

import TableHeaders from './TableHeaders';


function TableComponent({sector}) {
  const [data, setData] = useState([]);

  

  useEffect(() => {
    axiosApi.get('http://127.0.0.1:5173/api/providers')
      .then(response => {
        setData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, [])

  return (
    <Table>
      <thead>
        <TableHeaders />
      </thead>
      <TableRow data={data} sector={sector} />
    </Table>
  )
}

export default TableComponent;
