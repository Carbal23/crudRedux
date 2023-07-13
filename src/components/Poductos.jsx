import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerProductosAction } from "../actions/productosAction";
import { Producto } from "./Producto";
import { Loading } from "./Loading";

export const Productos = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos.productos);
  const error = useSelector((state) => state.productos.error);
  const cargando = useSelector((state) => state.productos.loading);

  useEffect(() => {
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos();
  }, []);

  return (
    <>
      <h2 className="text-center my-5">Listado de productos</h2>
      <div className="d-flex justify-content-center">
        {error ? (
          <p className="font-weight-bold alert alert-danger text-center mt-4">
            Hubo un error
          </p>
        ) : null}
        {cargando ? <Loading /> : null}
      </div>

      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* {productos.map((producto) => (
                <Producto key={producto.id} producto={producto} />
              ))} */}
          {productos.length === 0
            ? <div className="d-flex justify-content-center">
              No hay productos
            </div> 
            : productos.map((producto) => (
                <Producto key={producto.id} producto={producto} />
              ))}
        </tbody>
      </table>
    </>
  );
};
