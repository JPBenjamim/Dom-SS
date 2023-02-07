import Modal from '../Modal'

function TableData({ data = [], sector }) {
  return (
    <tr>  
      {data.length > 0 && data.map((item, index) => (
        // eslint-disable-next-line react/jsx-no-undef
        <React.Fragment key={index}>
          <td>{item.providerName}</td>
          <td>{item.idNotes}</td>
          <td>{item.hour}</td>
          <td>{item.quantity}</td>
          <td>{item.loadType}</td>
          <td>{item.isSchedule ? "Sim" : "Não"}</td>
          <td>
            {
            sector !== 'home' &&
              <Modal color="warning" name="Editar" typeModal="edit" dataDetails={item}/> 
            }
          </td>
          <td>
            {
            sector !== 'home' &&
              <Modal color="success" name="Liberar nota" typeModal="releaseNote" dataDetails={item}/> 
            }
          </td>
        </React.Fragment>
      ))}
    </tr>
  )
}
export default TableData
