import { useState } from 'react'
import  Button from 'react-bootstrap/Button'
import Form from './formAdd'

import Modal from 'react-modal'



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

function ModalComponent() {
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          {' '}
          <Form />
        </div>
        <Button onClick={() => closeModal()}></Button>
      </Modal>
      <Button onClick={() => openModal()} variant="primary">
        Incluir
      </Button>
    </div>
  )
}

export default ModalComponent
