import { useState } from "react";

import { Form, Button, InputGroup } from "react-bootstrap";

import { axiosApi } from "../services/axios";

function FormAdd({ closeModal, typeModal = "", dataDetails = {}}) {
  const [supplierName, setSupplierName] = useState(dataDetails?.providerName || "");
  const [notes, setNotes] = useState(dataDetails.noteNumber  || "");
  const [listNotes, setListNotes] = useState([]);
  const [quantity, setQuantity] = useState(dataDetails.quantity || "");
  const [hour, setHour] = useState(dataDetails.hour || "");
  const [load, setLoad] = useState(dataDetails.loadType || "Seca");
  const [isSchedule, setIsSchedule] = useState(dataDetails.isSchedule || false);
  const [document, setDocument] = useState("");
  const [vehicleType, setVehicleType] = useState(dataDetails.vehicleType || "Caminhão");
  const [telePhone, setTelePhone] = useState(dataDetails.telephone || "");
  const [quantityType, setQuantityType] = useState(dataDetails.volumeType || "");
  const [name, setName] = useState(dataDetails.name || "");
  const [messageError, setMessageError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosApi.post('providers', {
        providerName: supplierName,
        hour: "2023-01-20T20:54:08.000Z",
        idNotes: "10101",
        idWorkDay: "",
        quantity: quantity,
        isConfirmedByHeritage: false,
        isConfirmedByCPD: false,
        isConfirmedByArbitrator: false,
        loadType: load,
        volumeType: quantityType,
        isChecked: false,
        isReturned: false,
        isSchedule: isSchedule,
        idDriver: ""
    }).then(() => {
      setMessageError("");
      closeModal();
    }).catch(() => {
      setMessageError("Erro ao incluir nota.");
    });
  };

  const handleKeyUpEnter = (e) => {
    if (e.keyCode === 13 && e.target.value !== "") {
      setListNotes([...listNotes, e.target.value]);
      setNotes("");
    }
  };

  const handleRemoveNote = (e) => {
    let result = listNotes.filter((note) => note !== e);
    setListNotes(result);
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="formSupplierName" className="mb-3">
          <Form.Label className="mb-1">Fornecedor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome do fornecedor"
            value={supplierName}
            disabled={typeModal === 'releaseNote'}
            onChange={(e) => setSupplierName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formNotes" className="mb-3">
          <Form.Label className="mb-1">Notas</Form.Label>
          <Form.Control
            type="text"
            placeholder="Números das notas"
            value={notes}
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                setNotes(e.target.value);
              }
            }}
            disabled={typeModal === 'releaseNote'}

            onKeyUp={handleKeyUpEnter}
          />
          <div className="d-flex mt-2 flex-wrap">
            {listNotes.map((value, index) => (
              <div className="mx-1" key={index}>
                <Button
                  type="button"
                  variant="success"
                  className="py-0 px-2"
                  onClick={() => handleRemoveNote(value)}
                >
                  {value}
                </Button>
              </div>
            ))}
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formQuantity">
          <div>
            <Form.Label className="mb-1">Quantidade</Form.Label>
          </div>
          <div className="d-flex justify-content-between">
            <div className="form-group col-6 ">
              <Form.Control
                type="text"
                placeholder="Quantidade"
                value={quantity}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setQuantity(e.target.value);
                  }
                }}
                disabled={typeModal === 'releaseNote'}

              />
            </div>
            <div className="form-group col-6 d-flex justify-content-around">
              <Form.Check
                type="radio"
                label="Pallets"
                name="quantityType"
                id="pallets"
                value="pallets"
                checked={quantityType === "pallets"}
                onChange={(e) => setQuantityType(e.target.value)}
                disabled={typeModal === 'releaseNote'}
                
              />
              <Form.Check
                type="radio"
                label="Volume"
                name="quantityType"
                id="volume"
                value="volume"
                checked={quantityType === "volume"}
                onChange={(e) => setQuantityType(e.target.value)}
                disabled={typeModal === 'releaseNote'}

              />
            </div>
          </div>
        </Form.Group>

        <Form.Group controlId="formHour" className="mb-3">
          <Form.Label className="mb-1">Hora</Form.Label>
          <Form.Control
            type="datetime-local"
            value={hour}
            disabled={typeModal === 'releaseNote'}

            onChange={(e) => setHour(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formLoad" className="mb-3">
          <Form.Label className="mb-1">Carga</Form.Label>
          <Form.Control
            as="select"
            value={load}
            disabled={typeModal === 'releaseNote'}

            onChange={(e) => setLoad(e.target.value)}
          >
            <option>Seca</option>
            <option>Fria</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="mb-1" >Agendado?</Form.Label>
          <div className="form-check form-check-inline mx-2">
            
            <input
              className="form-check-input"
              type="radio"
              id="yes"
              name="schedule"
              value={true}
              disabled={typeModal === 'releaseNote'}

              checked={isSchedule === true}
              onChange={(e) => setIsSchedule(e.target.value !== true)}
            />
            <label className="form-check-label" htmlFor="yes">
              Sim
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="no"
              name="schedule"
              value={false}
              disabled={typeModal === 'releaseNote'}

              checked={isSchedule === false}
              onChange={(e) => setIsSchedule(e.target.value === true)}
            />
            <label className="form-check-label" htmlFor="no">
              Não
            </label>
          </div>
        </Form.Group>

        <Form.Group controlId="formName" className="mb-3">
          <Form.Label className="mb-1">Nome</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            disabled={typeModal === 'releaseNote'}
            onChange={e => setName(e.target.value)}
            value={name}
            placeholder="Nome do motorista"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDocument">
          <Form.Label className="mb-1">Documento</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            disabled={typeModal === 'releaseNote'}

            placeholder="CNH ou CPF"
            inputProps={{ step: 1 }}
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                setDocument(e.target.value);
              }
            }}
            value={document}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContact">
          <Form.Label className="mb-1">Contato</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control 
              disabled={typeModal === 'releaseNote'}
              type="cellphone" 
              placeholder="(21) 99999-9999"
              onChange={e => setTelePhone(e.target.value)}
              value={telePhone}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formVehicle">
          <Form.Label className="mb-1">Tipo de Veiculo</Form.Label>
          <Form.Control as="select" 
            disabled={typeModal === 'releaseNote'}
            onChange={e => setVehicleType(e.target.value)}
            value={vehicleType}
          >
            <option>Caminhão</option>
            <option>Carreta</option>
            <option>Vuc</option>
            <option>Toco</option>
            <option>Veiculo pequeno</option>
            <option>Furgão</option>
          </Form.Control>
        </Form.Group>
        <p>
          {messageError}
        </p>
        <div className="d-flex justify-content-between pt-4">
          {typeModal !== 'releaseNote' &&
            <Button variant="primary" onClick={e => handleSubmit(e)}>{typeModal === 'edit' ? 'Salvar' : 'Adicionar'}</Button>
          }
          
          {typeModal === 'releaseNote' ?
          <>
            <Button variant="success" onClick={closeModal}>
              Liberar nota
            </Button>
          </>
          :
          <Button variant="danger" onClick={closeModal}>
            Cancelar
          </Button>
          }
          
        </div>
      </Form>
    </div>
  );
}

export default FormAdd;
