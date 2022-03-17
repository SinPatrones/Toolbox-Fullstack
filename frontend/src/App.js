import {useEffect, useState} from "react";
import {Col, Container, Row} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import NavbarApp from './components/Navbar';
import TableApp from './components/Table';
import Menu from "./components/Menu";

function App() {
  const [dataTable, setDataTable] = useState([]);
  const [columnsTable] = useState(['File Name', 'Text', 'Number', 'Hex']);
  const [show, setShow] = useState(false);
  const [fileName, setFileName] = useState('');
  const [listFileName, setListFileName] = useState([]);
  const [fileSelected, setFileSelected] = useState('');

  const fetchFileNameList = async () => {
    try {
      setDataTable([]);
      setShow(false);
      const URL = 'http://localhost:4000/files/list';
      const data = await fetch(URL);
      if (data.status === 200) {
        let dataJson = await data.json();
        setListFileName(dataJson);
      }
    } catch (e) {
      console.log('Error', e);
    }
  }

  const fetchData = async (fileNameInput = '') => {
    try {
      setDataTable([]);
      setShow(false);
      const URL = fileNameInput.length ? `http://localhost:4000/files/data?fileName=${fileNameInput}` : 'http://localhost:4000/files/data';
      const data = await fetch(URL);
      if (data.status === 200) {
        let dataJson = await data.json();

        let arrayData = [];
        dataJson.map((fileData, idx) => {
          let rows = [];
          const {file} = fileData;
          fileData.lines.map(line => {
            rows.push([file, line.text, line.number, line.hex]);
          });
          arrayData.push(...rows);
        });

        setDataTable(arrayData);
        setFileName('');
      } else {
        setShow(true);
      }
    } catch (e) {
      console.log('Error', e);
    }
  }

  useEffect(() => {
    if (fileSelected !== '') {
      fetchData(fileSelected);
    } else {
      fetchData();
    }
  }, [fileSelected]);

  useEffect(() => {
    fetchData();
    fetchFileNameList();

  }, []);

  return (
    <Container fluid style={{padding: 0}}>
      <NavbarApp/>

      {
        show && <Row className="justify-content-center mt-2">
          <Col sm={12} md={4}>
            <Alert variant="danger" onClose={() => {
              setShow(false);
              setFileName('');
            }} dismissible>
              <Alert.Heading>!Sin información del archivo {fileName}!</Alert.Heading>
              <p>No tenemos datos sobre el archivo que busca</p>
            </Alert>
          </Col>
        </Row>
      }

      <Menu
        fileSelected={fileSelected}
        setFileSelected={setFileSelected}
        listFileName={listFileName}
        fileName={fileName}
        setFileName={setFileName}
        fetchData={fetchData}
      />

      <Row style={{padding: '0 20px', margin: 0}}>
        <Col sm={12}>
          <TableApp
            data={dataTable}
            columns={columnsTable}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
