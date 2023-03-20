import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { axiosApi } from '../../services/axios';
import { Form, Button } from 'react-bootstrap';

import TableRow from './TableRow';

import styles from './Table.module.css';

function TableComponent({ sector, urlServer, isAdmin = false, isCpd = false, isHome = false}) {
  const now = new Date();
  const offset = -3 * 60;
  const isoString = new Date(now.getTime() + offset * 60 * 1000).toISOString();
  const [data, setData] = useState([]);
  const [whatUseSchedule, setWhatUseSchedule] = useState('all');
  const [startDatetime, setStartDatetime] = useState(isoString);
  const [endDatetime, setEndDatetime] = useState(isoString);
  const [isSchedule, setIsSchedule] = useState(false);
 

  const worksheets = [
    {
      name: "Requests",
      columns: [
        { label: "Full Name", value: "name" },
        { label: "Email", value: "email" },
        { label: "Template", value: "template" }
      ],
      data: [
        {
          name: "Bob Ross",
          email: "boss_ross@gmail.com",
          template: "Accounts Receivables"
        }
      ]
    }
  ];

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

  const getDataForPeriod = () => {
    axiosApi
      .post(`provider-date`, {
        startTime: startDatetime,
        endTime: endDatetime,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataForPeriodSchedule = () => {
    axiosApi
      .post(`provider-date-schedule`, {
        startTime: startDatetime,
        endTime: endDatetime,
        isSchedule: isSchedule,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataForPeriodAfterHour = () => {
    axiosApi
      .post(`provider-date-period`, {
        startTime: startDatetime,
        endTime: endDatetime,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {isAdmin  &&(
        <div className={styles.containerAdminFilter}>
          <div className="col-3 d-flex justify-content-between">
            <Form.Group controlId="formHour" className="mb-3">
              <Form.Label className="mb-1">Hora Inicial</Form.Label>
              <Form.Control
                type="datetime-local"
                value={startDatetime.slice(0, 16)}
                onChange={(e) => setStartDatetime(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formHour" className="mb-3">
              <Form.Label className="mb-1">Data Final</Form.Label>
              <Form.Control
                type="datetime-local"
                value={endDatetime.slice(0, 16)}
                onChange={(e) => setEndDatetime(e.target.value)}
              />
            </Form.Group>
          </div>
          <div>
            <div className="d-block">
              <span>Usar agendamento?</span>
              <div className="form-group col-6 d-flex justify-content-around">
                <Form.Check
                  type="radio"
                  label="Todos"
                  name="typeFilter"
                  id="all"
                  value="all"
                  checked={whatUseSchedule === 'all'}
                  onChange={(e) => setWhatUseSchedule(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Agendadas"
                  name="typeFilter"
                  id="schedule"
                  value="schedule"
                  checked={whatUseSchedule === 'schedule'}
                  onChange={(e) => setWhatUseSchedule(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Depois do horario"
                  name="typeFilter"
                  id="afterHour"
                  value="afterHour"
                  checked={whatUseSchedule === 'afterHour'}
                  onChange={(e) => setWhatUseSchedule(e.target.value)}
                />
              </div>
            </div>
          </div>
          {whatUseSchedule === 'schedule' && (
            <div>
              <div className="d-block">
                <>
                  <span>Agendamento:</span>
                  <div className="form-group col-6 d-flex justify-content-around">
                    <Form.Check
                      type="radio"
                      label="Agendado"
                      name="isSchedule"
                      id="sim"
                      value={true}
                      checked={isSchedule === true}
                      onChange={() => setIsSchedule(true)}
                    />
                    <Form.Check
                      type="radio"
                      label="Não agendado"
                      name="isSchedule"
                      id="nao"
                      value={false}
                      checked={isSchedule === false}
                      onChange={() => setIsSchedule(false)}
                    />
                  </div>
                </>
              </div>
            </div>
          )}
          <div>
            <Button
              type="submit"
              variant="primary"
              onClick={() => {
                if (whatUseSchedule === 'all') {
                  getDataForPeriod();
                } else if (whatUseSchedule === 'schedule') {
                  getDataForPeriodSchedule();
                } else {
                  getDataForPeriodAfterHour();
                }
              }}
            >
              Filtrar
            </Button>
          </div>
        </div>
      )}
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
