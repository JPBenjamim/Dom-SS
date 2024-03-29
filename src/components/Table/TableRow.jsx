import { useState } from 'react';

import Modal from '../Modal';
import styles from './Table.module.css';
import { Button } from 'react-bootstrap';

import ClockLoader from 'react-spinners/ClockLoader';
import { axiosApi } from '../../services/axios';

function TableRow({ data = [], sector, getTableExport }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteNF = async (id) => {
    setIsLoading(true);

    try {
      await axiosApi.delete(`provider-delete/${id}`);
      getTableExport();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      {data.length > 0 &&
        data.map((item, index) => {
          let date = new Date(item.hour);
          const options = { timeZone: 'America/Sao_Paulo', hour12: false };
          const timeString = date.toLocaleTimeString('pt-BR', options);
          const hours = timeString.substring(0, timeString.indexOf(':'));
          const minutes = timeString.substring(
            timeString.indexOf(':') + 1,
            timeString.lastIndexOf(':'),
          );
          index += 1;

          return item.isConfirmedByArbitrator && sector !== 'home' ? null : (
            <tr key={index} className="table-responsive">
              <td className="align-middle text-center">{index}</td>
              <td className="align-middle text-center">{item.providerName}</td>
              <td className="align-middle text-center">
                <span className={styles.notes}>{item.notes.noteNumber}</span>
              </td>
              <td className="align-middle text-center">
                {hours}:{minutes}
              </td>
              <td className="align-middle text-center">{item.quantity}</td>
              <td className="align-middle text-center">{item.loadType}</td>
              <td className="align-middle text-center">{item.isSchedule ? 'Sim' : 'Não'}</td>
              {sector === 'home' ? (
                <>
                  <td className="align-middle text-center">
                    {!item.isConfirmedByCPD ? (
                      'Aguardando liberação CPD'
                    ) : (
                      <>
                        {item.isConfirmedByArbitrator
                          ? 'Conferência concluída'
                          : 'Aguardando conferência'}
                      </>
                    )}
                  </td>
                  <td className="align-middle text-center">
                    <Modal
                      sector={sector}
                      getTableExport={getTableExport}
                      color="warning"
                      name={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                      }
                      typeModal="view"
                      dataDetails={item}
                    />
                  </td>
                </>
              ) : (
                <>
                  <td className="align-middle text-center">
                    {sector !== 'home' && (
                      <Modal
                        sector={sector}
                        getTableExport={getTableExport}
                        color="warning"
                        className={styles.buttonAction}
                        name={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        }
                        typeModal="edit"
                        dataDetails={item}
                      />
                    )}
                  </td>
                  <td className="align-middle text-center">
                    {sector !== 'home' && (
                      <Modal
                        sector={sector}
                        color="success"
                        className={styles.buttonAction}
                        name={
                          !item.isConfirmedByCPD ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-file-earmark-check"
                              viewBox="0 0 16 16"
                            >
                              <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-file-earmark-check-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm1.354 4.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                            </svg>
                          )
                        }
                        typeModal="releaseNote"
                        dataDetails={item}
                      />
                    )}
                  </td>
                  <td className="align-middle text-center">
                    <Button
                      className={styles.buttonAction}
                      variant="danger"
                      type="button"
                      onClick={() => handleDeleteNF(item.id)}
                    >
                      {isLoading ? (
                        <ClockLoader size={16} color="#FFFFFF" loading={true} />
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                              fillRule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                          </svg>
                        </>
                      )}
                    </Button>
                  </td>
                </>
              )}
            </tr>
          );
        })}
    </>
  );
}
export default TableRow;
