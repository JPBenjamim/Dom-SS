import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

function FormAdd({ closeModal }) {
  const [supplierName, setSupplierName] = useState("");
  const [notes, setNotes] = useState("");
  const [listNotes, setListNotes] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [hour, setHour] = useState("");
  const [load, setLoad] = useState("Seca");
  const [isSchedule, setIsSchedule] = useState(false);
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
        <Form.Group controlId="formSupplierName" className="py-2">
          <Form.Label>Fornecedor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome do fornecedor"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formNotes" className="py-2">
          <Form.Label>Notas</Form.Label>
          <Form.Control
            type="text"
            placeholder="Números das notas"
            value={notes}
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                setNotes(e.target.value);
              }
            }}
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
        <Form.Group controlId="formQuantity">
          <div>
            <Form.Label className="py-2">Quantidade</Form.Label>
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
              />
              <Form.Check
                type="radio"
                label="Volume"
                name="quantityType"
                id="volume"
                value="volume"
                onChange={(e) => setQuantityType(e.target.value)}
              />
            </div>
          </div>
        </Form.Group>

        <Form.Group controlId="formHour" className="py-2">
          <Form.Label>Hora</Form.Label>
          <Form.Control
            type="time"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formLoad" className="py-2">
          <Form.Label>Carga</Form.Label>
          <Form.Control
            as="select"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
          >
            <option>Seca</option>
            <option>Fria</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="py-2">
          <Form.Label>Agendado?</Form.Label>
          <div className="form-check form-check-inline mx-2">
            <input
              className="form-check-input"
              type="radio"
              id="yes"
              name="schedule"
              value="yes"
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
              checked={isSchedule === "no"}
              onChange={(e) => setIsSchedule(e.target.value)}
            />
            <label className="form-check-label" htmlFor="no">
              Não
            </label>
          </div>
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Nome do motorista"
          />
        </Form.Group>

        <Form.Group controlId="formDocument">
          <Form.Label>Documento</Form.Label>
          <Form.Control
            className="mb-3"
            type="text"
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

        <Form.Group controlId="formContact">
          <Form.Label>Contato</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control type="cellphone" placeholder="(21) 99999-9999" />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formVehicle">
          <Form.Label>Tipo de Veiculo</Form.Label>
          <Form.Control as="select">
            <option>Caminhão</option>
            <option>Carreta</option>
            <option>Vuc</option>
            <option>Toco</option>
            <option>Veiculo pequeno</option>
            <option>Furgão</option>
          </Form.Control>
        </Form.Group>

        <div className="d-flex justify-content-between pt-4">
          <Button variant="primary">Adicionar</Button>

          <Button variant="danger" onClick={closeModal}>
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default FormAdd;
