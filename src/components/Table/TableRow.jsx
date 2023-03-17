import Modal from '../Modal';
import styles from './Table.module.css'

import {axiosApi} from "../../services/axios";

function TableRow({data = [], sector, getTableExport }) {
  const handleDeleteNF = async (id) => {
    try{
      await axiosApi.delete(`provider-delete/${id}`);
      getTableExport();
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
      {data.length > 0 &&
        data.map((item, index) => {
          let date = new Date(item.hour);
          const options = { timeZone: 'America/Sao_Paulo', hour12: false }
          const timeString = date.toLocaleTimeString('pt-BR', options);
          const hours = timeString.substring(0, timeString.indexOf(':'));
          const minutes = timeString.substring(timeString.indexOf(':') + 1, timeString.lastIndexOf(':'));
          index += 1;

          return(
          item.isConfirmedByArbitrator && sector !== 'home' ? null :
          <tr key={index}>
            <td>{index}</td>
            <td>{item.providerName}</td>
            <td>
              <span className={styles.notes}>
                {item.notes.noteNumber}     
              </span>
            </td>
            <td>{hours}:{minutes}</td>
            <td>{item.quantity}</td>
            <td>{item.loadType}</td>
            <td>{item.isSchedule ? 'Sim' : 'Não'}</td>
            {
              sector === "home"

              ?
                <>
                  <td>
                    {!item.isConfirmedByCPD ? 
                      'Aguardando liberação CPD' : 
                      <>
                        {item.isConfirmedByArbitrator ? 'Conferência concluída' : 'Aguardando conferência'}
                      </>
                    }
                  </td>
                  <td>
                    <Modal sector={sector} getTableExport={getTableExport} color="warning" name="Ver" typeModal="view" dataDetails={item} />
                  </td>
                </>
              :
            <>
              <td>
                {sector !== 'home' && (
                  <Modal sector={sector} getTableExport={getTableExport} color="warning" name="Editar" typeModal="edit" dataDetails={item} />
                )}
              </td>
              <td>
                {sector !== 'home' && (
                  <Modal
                    sector={sector}
                    color="success"
                    name={!item.isConfirmedByCPD ? 'Liberar nota' : 'Conferir nota'}
                    typeModal="releaseNote"
                    dataDetails={item}
                  />
                )}
              </td>
              <td>
                <button type="button" onClick={() => handleDeleteNF(item.id)} className={styles.deleteNoteButton}>
                  Deletar
                </button>
              </td>
              </>
              }
            </tr>
        )})}
    </>
  );
}
export default TableRow;
