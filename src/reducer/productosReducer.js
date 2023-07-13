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

//cada reducer tiene su propio state
const initialState = {
  productos: [],
  error: null,
  loading: false,
  productoEliminar: null,
  productoEditar: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OBTENER_PRODUCTOS:
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: action.payload,
      };
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        productos: [...state.productos, action.payload],
        error: null,
      };

    case AGREGAR_PRODUCTO_ERROR:
    case OBTENER_PRODUCTOS_ERROR:
    case PRODUCTO_ELIMINAR_ERROR:
    case PRODUCTO_EDITAR_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case OBTENER_PRODUCTOS_EXITOSO:
      return {
        ...state,
        loading: false,
        // error: null,
        productos: action.payload,
      };
    case OBTENER_PRODUCTO_ELIMINAR:
      return {
        ...state,
        productoEliminar: action.payload,
      };
    case PRODUCTO_ELIMINAR_EXITOSO:
      return {
        ...state,
        productos: state.productos.filter(
          (producto) => producto.id !== state.productoEliminar
        ),
        productoEliminar: null,
        error: null,
      };
    case OBTENER_PRODUCTO_EDITAR:
      return {
        ...state,
        productoEditar: action.payload,
      };

    case PRODUCTO_EDITAR_EXITOSO:
      return {
        ...state,
        productoEditar: null,
        productos: state.productos.map((producto) =>
          producto.id === action.payload.id
            ? (producto = action.payload)
            : producto
        ),
      };
    case RESET_STATE:
      return {
        ...state,
        error: null,
        productoEditar: null,
        productoEliminar: null,
      };
    default:
      return state;
  }
}
