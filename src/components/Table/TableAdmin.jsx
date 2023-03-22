import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { axiosApi } from '../../services/axios';
import { Form, Button } from 'react-bootstrap';

import TableRow from './TableRow';

import styles from './Table.module.css';

import ReactExport from 'react-export-excel-xlsx-fix';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function TableComponent({ sector, isAdmin = false }) {
  const now = new Date();
  const offset = -3 * 60;
  const dateTime = new Date(now.getTime() + offset * 60 * 1000);
  const isoString = dateTime.toISOString();
  const [data, setData] = useState([]);
  const [whatUseSchedule, setWhatUseSchedule] = useState('all');
  const [startDatetime, setStartDatetime] = useState(isoString);
  const [endDatetime, setEndDatetime] = useState(isoString);
  const [isSchedule, setIsSchedule] = useState(false);
  const dayCurrent = now.getDate().toString().padStart(2, '0');
  const MonthCurrent = (now.getMonth() + 1).toString().padStart(2, '0');
  const [dataSet1, setDataSet1] = useState([]);

  const getTableExport = () => {
    axiosApi
      .post(`provider-date`, {
        startTime: `${dateTime.getFullYear()}-${MonthCurrent}-${dayCurrent}T00:00:28.549Z`,
        endTime: `${dateTime.getFullYear()}-${MonthCurrent}-${dayCurrent}T23:59:28.549Z`,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataForPeriod = () => {
    axiosApi
      .post(`provider-date`, {
        startTime: startDatetime,
        endTime: endDatetime,
      })
      .then((response) => {
        getExcelExport(response);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getExcelExport = ({ data }) => {
    setDataSet1([]);
    data.forEach((item) => {
      const { hour } = item;
      let hourProvider = new Date(hour);
      const dayCurrent = hourProvider.getDate().toString().padStart(2, '0');
      const monthCurrent = (hourProvider.getMonth() + 1).toString().padStart(2, '0');
      let status = '';
      if (item.isReturned) {
        status = 'Devolvida';
      } else if (item.isConfirmedByArbitrator) {
        status = 'Confirmado conferente';
      } else if (item.isConfirmedByCPD) {
        status = 'Confirmado CPD';
      } else {
        status = 'Confirmado Patrimônio';
      }

      setDataSet1(prevDataSet => [...prevDataSet, {
        data: `${dayCurrent}/${monthCurrent}/${hourProvider.getFullYear()}`,
        store: `Realengo`,
        provider: `${item.providerName}`,
        status: status,
        observation: '',
      }]);        
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
        getExcelExport(response);
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
        getExcelExport(response);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {isAdmin && (
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
            <ExcelFile>
              <ExcelSheet data={dataSet1} name="Employees">
                <ExcelColumn label="Data" value="data" />
                <ExcelColumn label="Loja" value="store" />
                <ExcelColumn label="Fornecedor" value="provider" />
                <ExcelColumn label="Status" value="status" />
                <ExcelColumn label="Observação" value="observation" />
              </ExcelSheet>
            </ExcelFile>
          </div>
        </div>
      )}
      <Table>
        <thead>
          <tr>
            <th className="align-middle text-center">Ordem</th>
            <th className="align-middle text-center">Fornecedor</th>
            <th className="align-middle text-center">Nota</th>
            <th className="align-middle text-center">Hora</th>
            <th className="align-middle text-center">Quantidade</th>
            <th className="align-middle text-center">Carga</th>
            <th className="align-middle text-center">Agendada</th>
            <th className="align-middle text-center">Status</th>
            <th className="align-middle text-center">Visualizar</th>
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
