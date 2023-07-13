import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetState } from "../actions/productosAction";
import { ocultarAlerta } from "../actions/alertaAction";

export const Header = () => {
  const dispatch = useDispatch();
  
  const handleOnclick = () => {
    dispatch(resetState());
    dispatch(ocultarAlerta());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
      <div className="container">
        <h1>
          {" "}
          <Link to="/" className="text-light" onClick={handleOnclick}>
            CRUD - React, Redux, Respt Api - Axios
          </Link>
        </h1>

        <Link
          to="/productos/nuevo"
          className="btn btn-danger nuevo-post d-block d-md-inline-block"
          onClick={handleOnclick}
        >
          Agregar producto &#43;
        </Link>
      </div>
    </nav>
  );
};
