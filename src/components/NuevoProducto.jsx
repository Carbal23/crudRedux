import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crearProductoAction } from "../actions/productosAction";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import { mostrarAlertaAction, ocultarAlerta } from "../actions/alertaAction";

export const NuevoProducto = () => {
  const navigate = useNavigate();
  const [inputProducto, setInputProducto] = useState({
    nombre: "",
    precio: 0,
  });

  const { nombre, precio } = inputProducto;

  const handleOnchange = (e) => {
    setInputProducto({
      ...inputProducto,
      [e.target.name]:
        e.target.name === "precio" ? Number(e.target.value) : e.target.value,
    });
  };

  //utilizar useDispacth para crear una funcion
  const dispatch = useDispatch();

  // usar los states
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector(state=> state.alerta.alerta);

  //mandar a llamar el action del productoAction
  const agregarProducto = (producto) => dispatch(crearProductoAction(producto));

  const handleSubmit = (e) => {
    e.preventDefault();
    // validar formulario
    if (nombre.trim() === "" || precio <= 0) {
      const alerta = {
        msg: "Todos los campos son obligatorios",
        class: "alert alert-danger text-center text-uppercase p3",
      };

      dispatch(mostrarAlertaAction(alerta));
      return;
    }

    //no hay errores
    dispatch(ocultarAlerta())

    //agregar producto
    agregarProducto(inputProducto);
    navigate("/");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {alerta ? <p className={alerta.class}>{alerta.msg}</p> : null}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="">Nombre del producto</label>
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  className="form-control"
                  name="nombre"
                  onChange={handleOnchange}
                  value={nombre}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Precio del producto</label>
                <input
                  type="number"
                  placeholder="Precio del producto"
                  className="form-control"
                  name="precio"
                  onChange={handleOnchange}
                  value={precio}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            <div className="d-flex justify-content-center">
              {cargando ? <Loading /> : null};
              {error ? (
                <p className="alert alert-danger p2 mt-4 text-center">
                  Hubo un error
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
