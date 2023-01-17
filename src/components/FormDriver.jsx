import React from 'react'
import { InputGroup, Form, FormGroup, FormLabel, FormSelect } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import styles from './formAdd.module.css'

import Boxes from '../assets/boxes.png'
import Pallet from '../assets/pallet.png'
import Yes from '../assets/yes.png'
import No from '../assets/no.png'

function formDriver() {
  return (
    <div>
      <Form style={{ width: '50vw' }}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Nome</Form.Label>{' '}
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Nome do motorista"
          />
        </Form.Group>

        <Form.Group>
          {' '}
          <Form.Label>Documento</Form.Label>{' '}
          <Form.Control
            className="mb-3"
            type="number"
            placeholder="CNH ou CPF"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Contato</Form.Label>{' '}
          <Form.Control
            className="mb-3"
            type="cellphone"
            placeholder="(21) 99999-9999"
            style={{ marginRight: '30px' }}
          />
        </Form.Group>

        <Form.Group>
          <FormLabel>
            Tipo de Veiculo
          </FormLabel>
          <FormSelect>
            <option>
              Caminhão
            </option>
            <option>
              Carreta
              </option>
              <option>
              Vuc
              </option>
              <option>
              Toco
              </option>
              <option>
              Veiculo pequeno
              </option>
              <option>
              Furgão
              </option>
          </FormSelect>
        </Form.Group>

        <Button type="submit" className="btn btn-primary">
          Confirmar
        </Button>
      </Form>
    </div>
  )
}
export default formDriver
