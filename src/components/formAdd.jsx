import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

function FormAdd({ closeModal, typeModal = "", dataDetails = {}}) {
  const [supplierName, setSupplierName] = useState(dataDetails?.suppliersName || "");
  const [notes, setNotes] = useState(dataDetails.idNotes  || "");
  const [listNotes, setListNotes] = useState([]);
  const [quantity, setQuantity] = useState(dataDetails.quantity || "");
  const [hour, setHour] = useState(dataDetails.hour || "");
  const [load, setLoad] = useState(dataDetails.load || "Seca");
  const [isSchedule, setIsSchedule] = useState(dataDetails.isSchedule || false);
  const [document, setDocument] = useState("");
  const [quantityType, setQuantityType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submited");
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
      <Form onSubmit={handleSubmit}>
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
                onChange={(e) => setQuantityType(e.target.value)}
                disabled={typeModal === 'releaseNote'}
                
              />
              <Form.Check
                type="radio"
                label="Volume"
                name="quantityType"
                id="volume"
                value="volume"
                onChange={(e) => setQuantityType(e.target.value)}
                disabled={typeModal === 'releaseNote'}

              />
            </div>
          </div>
        </Form.Group>

        <Form.Group controlId="formHour" className="mb-3">
          <Form.Label className="mb-1">Hora</Form.Label>
          <Form.Control
            type="time"
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
              value="yes"
              disabled={typeModal === 'releaseNote'}

              checked={isSchedule === "yes"}
              onChange={(e) => setIsSchedule(e.target.value)}
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
              value="no"
              disabled={typeModal === 'releaseNote'}

              checked={isSchedule === "no"}
              onChange={(e) => setIsSchedule(e.target.value)}
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
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formVehicle">
          <Form.Label className="mb-1">Tipo de Veiculo</Form.Label>
          <Form.Control as="select" 
            disabled={typeModal === 'releaseNote'}
          >
            <option>Caminhão</option>
            <option>Carreta</option>
            <option>Vuc</option>
            <option>Toco</option>
            <option>Veiculo pequeno</option>
            <option>Furgão</option>
          </Form.Control>
        </Form.Group>

        <div className="d-flex justify-content-between pt-4">
          {typeModal !== 'releaseNote' &&
            <Button variant="primary">{typeModal === 'edit' ? 'Salvar' : 'Adicionar'}</Button>
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
