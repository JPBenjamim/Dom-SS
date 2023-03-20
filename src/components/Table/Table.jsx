import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { axiosApi } from '../../services/axios';

import TableRow from './TableRow';

function TableComponent({ sector, urlServer, isAdmin = false, setLastUpdateDateString}) {
  const now = new Date();
  const [data, setData] = useState([]);
  const dayCurrent = now.getDate().toString().padStart(2, '0');
  const MonthCurrent = (now.getMonth() + 1).toString().padStart(2, '0');

  useEffect(() => {
    axiosApi
      .post(`provider-date`, {
        startTime: `${now.getFullYear()}-${MonthCurrent}-${dayCurrent}T00:00:28.549Z`,
        endTime: `${now.getFullYear()}-${MonthCurrent}-${dayCurrent}T23:59:28.549Z`,
      })
      .then((response) => {
          const hourCurrent = now.getHours().toString().padStart(2, '0');
          const minutesCurrent = now.getMinutes().toString().padStart(2, '0');
          const dayCurrent = now.getDate().toString().padStart(2, '0');
          const MonthCurrent = (now.getMonth() + 1).toString().padStart(2, '0');

          setLastUpdateDateString(`${dayCurrent}/${MonthCurrent}/${now.getFullYear()} - ${hourCurrent}:${minutesCurrent}`);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [urlServer]);

  useEffect(() => {
    const getTable = () => {
      axiosApi
        .post(`provider-date`, {
          startTime: `${now.getFullYear()}-${MonthCurrent}-${dayCurrent}T00:00:28.549Z`,
          endTime: `${now.getFullYear()}-${MonthCurrent}-${dayCurrent}T23:59:28.549Z`,
        })
        .then((response) => {
          const hourCurrent = now.getHours().toString().padStart(2, '0');
          const minutesCurrent = now.getMinutes().toString().padStart(2, '0');
          const dayCurrent = now.getDate().toString().padStart(2, '0');
          const MonthCurrent = (now.getMonth() + 1).toString().padStart(2, '0');

          setLastUpdateDateString(`${dayCurrent}/${MonthCurrent}/${now.getFullYear()} - ${hourCurrent}:${minutesCurrent}`);
          setData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    setInterval(getTable, sector === 'home' && !isAdmin ? 60000 : 240000);
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
      <Table className="table-responsive">
        <thead>
          <tr>
            <th className="align-middle text-center">Ordem</th>
            <th className="align-middle text-center">Fornecedor</th>
            <th className="align-middle text-center">Nota</th>
            <th className="align-middle text-center">Hora</th>
            <th className="align-middle text-center">Quantidade</th>
            <th className="align-middle text-center">Carga</th>
            <th className="align-middle text-center">Agendada</th>
            {sector === 'home' ? 
              <>
                <th className="align-middle text-center">Status</th>
                <th className="align-middle text-center">Visualizar</th>
              </>
            :
              <>
                <th className="align-middle text-center">Editar</th>
                <th className="align-middle text-center">Liberar</th>
                <th className="align-middle text-center">Deletar</th>
              </>
            }
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
