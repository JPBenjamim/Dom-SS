import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { axiosApi } from '../../services/axios';

import TableRow from './TableRow';

function TableComponent({ sector, urlServer, isAdmin = false }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosApi
      .get(`${urlServer}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [urlServer]);

  useEffect(() => {
    const getTable = () => {
      axiosApi
        .get(`${urlServer}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    setInterval(getTable, sector === 'home' && !isAdmin ? 1000 : 240000);
  }, [urlServer, sector, isAdmin]);

  const getTableExport = () => {
    axiosApi
      .get(`${urlServer}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Ordem</th>
            <th>Fornecedor</th>
            <th>Nota</th>
            <th>Hora</th>
            <th>Quantidade</th>
            <th>Carga</th>
            <th>Agendada</th>
          </tr>
        </thead>
        <tbody>
          <TableRow data={data} sector={sector} getTableExport={getTableExport} />
        </tbody>
      </Table>
    </>
  );
}

export default TableComponent;
