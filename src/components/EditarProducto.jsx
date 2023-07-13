import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editarProductoAction } from "../actions/productosAction";
import { useNavigate } from "react-router-dom";

export const EditarProducto = () => {
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
  });
  const productoEditar = useSelector((state) => state.productos.productoEditar);
  const dispatch = useDispatch();

  useEffect(() => {
    setProducto(productoEditar);
  }, [productoEditar]);
  const { nombre, precio, id } = producto;

  const handleOnchange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]:
        e.target.name === "precio" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editarProductoAction(producto));
    navigate("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="">Nombre del producto</label>
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  className="form-control"
                  name="nombre"
                  value={nombre}
                  onChange={handleOnchange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Precio del producto</label>
                <input
                  type="number"
                  placeholder="Precio del producto"
                  className="form-control"
                  name="precio"
                  value={precio}
                  onChange={handleOnchange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
