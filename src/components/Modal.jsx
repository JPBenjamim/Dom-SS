import { useState } from 'react'
import  {Button, Modal} from 'react-bootstrap'
import FormAdd from './formAdd'



function ModalComponent() {
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={() => openModal()} variant="primary">Incluir</Button>

      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Incluir</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAdd closeModal={closeModal} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalComponent