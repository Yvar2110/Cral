import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import { borrar, GuardarData, listarData } from "./firebase/index";

const data = [];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      apellido: "",
      direccion: "",
      ciudad: "",
      telefono: ""

    },
  };


  componentDidMount() {
    (async () => {
      console.log(await listarData())
      this.setState({
        ...this.state, data: await listarData()
      })
    })()
    console.log(this.state)
  }


  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };
  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].apellido = dato.apellido;
        arreglo[contador].direccion = dato.direccion;
        arreglo[contador].telefono = dato.telefono;
        arreglo[contador].ciudad = dato.ciudad;

      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = async (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      await borrar(dato.id)
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = async () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    await GuardarData(valorNuevo)
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>

                <th>Nombre</th>
                <th>Apellido</th>
                <th>Direccion</th>
                <th>Ciudad</th>
                <th>Telefono</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.nombre}</td>
                  <td>{dato.apellido}</td>
                  <td>{dato.direccion}</td>
                  <td>{dato.ciudad}</td>
                  <td>{dato.telefono}</td>
                  <td>
                    <Button color="danger" onClick={() => this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div><h3>Editar Cliente</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Nombre:
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Apellido:
              </label>
              <input
                className="form-control"
                name="apellido"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.apellido}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Direccion:
              </label>
              <input
                className="form-control"
                name="direccion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.direccion}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Ciudad:
              </label>
              <input
                className="form-control"
                name="ciudad"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.ciudad}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Telefono:
              </label>
              <input
                className="form-control"
                name="telefono"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.telefono}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Insertar Cliente</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Nombre:
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Apellido:
              </label>
              <input
                className="form-control"
                name="apellido"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Direccion:
              </label>
              <input
                className="form-control"
                name="direccion"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Ciudad:
              </label>
              <input
                className="form-control"
                name="ciudad"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Telefono:
              </label>
              <input
                className="form-control"
                name="telefono"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
