import clienteAxios from "../config/axios";
import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_ERROR,
  AGREGAR_PRODUCTO_EXITO,
  OBTENER_PRODUCTOS,
  OBTENER_PRODUCTOS_ERROR,
  OBTENER_PRODUCTOS_EXITOSO,
  OBTENER_PRODUCTO_EDITAR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_EDITAR_ERROR,
  PRODUCTO_EDITAR_EXITOSO,
  PRODUCTO_ELIMINAR_ERROR,
  PRODUCTO_ELIMINAR_EXITOSO,
  RESET_STATE,
} from "../types";
import Swal from "sweetalert2";

//crear nuevos productos
export function crearProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      await clienteAxios.post("/producto", producto);
      dispatch(agregarProductoExito(producto));
      Swal.fire("Correcto", "El producto se agrego correctamente", "success");

    } catch (error) {
      console.log(error.response);
      dispatch(agregarProductoError(true));
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Hubo un error, vuelva a intentarlo",
      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

const agregarProductoError = (payload) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: payload,
});

//Obtener productos

export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(obtenerProductos());

    try {
      const respuesta = await clienteAxios.get("/productos");
      dispatch(obtenerProductosExitoso(respuesta.data));
    } catch (error) {
      console.log(error.response);
      dispatch(obtenerProductosError(true));
    }
  };
}

const obtenerProductos = () => ({
  type: OBTENER_PRODUCTOS,
  payload: true,
});

const obtenerProductosExitoso = (productos) => ({
  type: OBTENER_PRODUCTOS_EXITOSO,
  payload: productos,
});

const obtenerProductosError = (payload) => ({
  type: OBTENER_PRODUCTOS_ERROR,
  payload: payload,
});

//ELIMINAR PRODUCTO
export function eliminarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));
    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(productoEliminarExitoso());

      Swal.fire(
        "Eliminado!",
        "El producto se ha eliminado correctamente",
        "success"
      );
    } catch (error) {
      console.log(error.response);
      dispatch(productoEliminarError(true));
    }
  };
}

const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});

const productoEliminarExitoso = () => ({
  type: PRODUCTO_ELIMINAR_EXITOSO,
});

const productoEliminarError = (payload) => ({
  type: PRODUCTO_ELIMINAR_ERROR,
  payload: payload,
});

//EDITAR PRODUCTOS
export function obtenerProductoEditarAction(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoEditar(producto));
  };
}

const obtenerProductoEditar = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

export function editarProductoAction(producto) {
  return async (dispatch) => {
    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      dispatch(editarProductoExitoso(producto));
    } catch (error) {
      console.log(error.response);
      dispatch(editarProductoError(true));
    }
  };
}

const editarProductoExitoso = (producto) => ({
  type: PRODUCTO_EDITAR_EXITOSO,
  payload: producto,
});

const editarProductoError = (payload) => ({
  type: PRODUCTO_EDITAR_ERROR,
  payload: payload,
});

export const resetState = () => ({
  type: RESET_STATE,
});
