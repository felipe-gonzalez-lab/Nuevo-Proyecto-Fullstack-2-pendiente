import { useParams, Link } from "react-router-dom";
import productos from "../data/productos";

function DetalleProducto({ agregarAlCarrito }) {
  const { id } = useParams();

  const producto = productos.find((producto) => producto.id === Number(id));

  if (!producto) {
    return (
      <main className="container py-5">
        <div className="alert alert-danger" role="alert">
          Producto no encontrado.
        </div>

        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-md-6">
          <h1 className="fw-bold">{producto.nombre}</h1>

          <p className="text-muted">{producto.categoria}</p>

          <p className="lead">
            {producto.descripcion}
          </p>

          <h3 className="text-primary mb-4">
            ${producto.precio.toLocaleString("es-CL")}
          </h3>

          <button
            className="btn btn-success me-2"
            onClick={() => agregarAlCarrito(producto)}
          >
            Agregar al carrito
          </button>

          <Link to="/" className="btn btn-outline-secondary">
            Volver
          </Link>
        </div>
      </div>
    </main>
  );
}

export default DetalleProducto;