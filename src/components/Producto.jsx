import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  eliminarProductoAction,
  obtenerProductoEditarAction,
} from "../actions/productosAction";
import Swal from "sweetalert2";

export const Producto = ({ producto }) => {
  const navigate = useNavigate();
  const { nombre, precio, id } = producto;
  const dispatch = useDispatch();

  const eliminarProducto = (id) => {
    //confirmar al usuario
    Swal.fire({
      title: "Estas seguro de eliminar este producto?",
      text: "Al eliminar el producto no podras recuperarlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar producto",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(eliminarProductoAction(id));
      }
    });
  };
  //   const obtenerProductoEditar = (producto)=>{

  //   }

  const redireccionEditar = (producto) => {
    dispatch(obtenerProductoEditarAction(producto));
    navigate(`/productos/editar/${producto.id}`);
  };
  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">${precio}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={() => redireccionEditar(producto)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => eliminarProducto(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};
