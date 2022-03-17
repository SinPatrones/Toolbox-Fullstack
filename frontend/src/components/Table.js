import {Table} from "react-bootstrap";

const TableApp = (props) => {
  const {style, data, columns} = props;

  return (
    <Table striped bordered hover responsive style={style}>
      <thead>
      <tr>
        {
          columns.map((column, idx) => {
            return <th key={`thead${idx}`}>{column}</th>;
          })
        }
      </tr>
      </thead>
      <tbody>
      {
        data.map((obj, idx) => {
          return (
            <tr key={`row${idx}`}>
              <td>{obj[0]}</td>
              <td>{obj[1]}</td>
              <td>{obj[2]}</td>
              <td>{obj[3]}</td>
            </tr>
          );
        })
      }
      {
        !data.length && <td colSpan={4} align={'center'} style={{padding: '30px 0'}}>
          <h3>NO HAY DATOS PARA MOSTRAR</h3>
        </td>
      }
      </tbody>
    </Table>
  );
}

export default TableApp;
