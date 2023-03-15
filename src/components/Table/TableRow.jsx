import Modal from '../Modal';
import styles from './Table.module.css'

function TableRow({ data = [], sector }) {
  return (
    <>
      {data.length > 0 &&
        data.map((item, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{item.providerName}</td>
            <td>
              <span className={styles.notes}>
                {item.notes.noteNumber}     
              </span>
            </td>
            <td>{item.hour}</td>
            <td>{item.quantity}</td>
            <td>{item.loadType}</td>
            <td>{item.isSchedule ? 'Sim' : 'Não'}</td>
            <td>
              {sector !== 'home' && (
                <Modal color="warning" name="Editar" typeModal="edit" dataDetails={item} />
              )}
            </td>
            <td>
              {sector !== 'home' && (
                <Modal
                  color="success"
                  name="Liberar nota"
                  typeModal="releaseNote"
                  dataDetails={item}
                />
              )}
            </td>
          </tr>
        ))}
    </>
  );
}
export default TableRow;
