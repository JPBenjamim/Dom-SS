import React from 'react'
import { InputGroup, Form, Row , FormGroup} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import styles from './formAdd.module.css'

import Boxes from '../assets/boxes.png'
import Pallet from '../assets/pallet.png'
import Yes from '../assets/yes.png'
import No from '../assets/no.png'
import ModalDriver from './ModalDriver'

function formAdd() {
  return (
    <div>
      <Form style={{ width: '50vw' }}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Fornecedor</Form.Label>{' '}
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Nome do fornedor"
          />
        </Form.Group>

        <Form.Group>
          {' '}
          <Form.Label>Notas</Form.Label>{' '}
          <Form.Control
            className="mb-3"
            type="number"
            placeholder="Números das notas"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Quantidade</Form.Label>{' '}
          <InputGroup>
            <Form.Control   className="mb-3"        
              type="number"
              placeholder="Quantidade"
              style={{ marginRight: '30px' }}
            />
            <FormGroup style={{ marginRight: '30px' }}>
            {['radio'].map(type => (
              <div key={`inline-${type}`} className="mb-3">
                 
                 <label className="image-checkbox">
                <Form.Check
                  inline                  
                  name="group1"
                  style={{ paddingLeft: '10px' }}
                  
                  type={type}
                  id={`inline-${type}-1`}
                />
                <img src={Boxes} style={{ width: '30px'} } />
                </label >

                <label className="image-checkbox" >
                <Form.Check
                  inline
                  name="group1"
                  style={{ paddingLeft: '20px' }}
                  type={type}
                  id={`inline-${type}-2`}
                />{' '}
                <img src={Pallet} style={{ width: '30px' }} />
                </label>
                </div>
              
            ))}
            </FormGroup>
          </InputGroup>
        </Form.Group>
       

        <Form.Group >
          <Form.Label>Agendada</Form.Label>{' '}
          <FormGroup>
          {['radio'].map(type => (
            <div key={`inline-${type}`} className="mb-3">
            <label className="image-checkbox" style={{ paddingRight: '10px' }}>
              <img src={Yes} alt=""  style={{ width: '30px' }}/>
              <Form.Check
              
                inline
                form-check-label  
                style={{ paddingLeft: '10px' }}    
                name="group2"
                type={type}
                id={`inline-${type}-3`}
              />
              </label>
              <label className='form-check-label' >
                <img src={No} style={{ width: '22px' }} alt="" />
              <Form.Check
                inline
                form-check-label
                name="group2"
                style={{ paddingLeft: '10px' }}
                
                type={type}
                id={`inline-${type}-4`}
              />
              </label>
            </div>
          ))}
          </FormGroup>
        </Form.Group>

        <Button type="submit" className="btn btn-primary">
          Confirmar
        </Button>
        < ModalDriver className="mb-3" />
      </Form>
    </div>
  )
}
export default formAdd
