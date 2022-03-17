import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";

const Menu = (props) => {
  const {fileSelected, setFileSelected, listFileName, fileName, setFileName, fetchData} = props;

  return (
    <Row style={{padding: '20px', margin: 0}} className="justify-content-between">

      <Col sm={12} md={6} lg={6} xl={3} className='mt-2'>
        <FloatingLabel controlId="floatingSelect" label="Archivos disponibles">
          <Form.Select aria-label="Floating label select example" value={fileSelected}
                       onChange={evt => setFileSelected(evt.target.value)}>
            <option value="">Escoga un archivo</option>
            {
              listFileName.map((obj, idx) => {
                return <option key={`select${idx}`} value={obj}>{obj}</option>;
              })
            }
          </Form.Select>
        </FloatingLabel>
      </Col>

      <Col sm={12} md={6} lg={6} xl={3} className='mt-2'>
        <Row>
          <Col sm={12} md={9}>
            <FloatingLabel
              controlId="floatingInput"
              label="Ingrese nombre de Archivo"
            >
              <Form.Control type="text" placeholder="test1.csv" value={fileName}
                            onChange={evt => setFileName(evt.target.value)}/>
            </FloatingLabel>
          </Col>
          <Col sm={12} md={3}>
            <Button variant="primary" className="btn-block" style={{height: '100%', width: '100%'}}
                    onClick={() => fetchData(fileName)}>
              Buscar
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Menu;
