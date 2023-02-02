import { useState } from 'react';

import Modal from '../Modal'

function TableData({ data, sector }) {
  const [openModalEdit, setOpenModalEdit] = useState(false);

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <tr>  
      <td>{data.suppliersName}</td>
      <td>{data.idNotes}</td>
      <td>{data.hour}</td>
      <td>{data.quantity}</td>
      <td>{data.load}</td>
      <td>{data.isSchedule}</td>
      <td>
        {
        sector !== 'home' &&
          <Modal color="warning" name="Editar" typeModal="edit" dataDetails={data}/> 
        }
      </td>
      <td>
        {
        sector !== 'home' &&
          <Modal color="success" name="Liberar nota" typeModal="releaseNote" dataDetails={data}/> 
        }
      </td>
    </tr>
  )
}
export default TableData