import { useParams, Link } from 'react-router-dom'
import { productosIniciales } from '../data/productos'

function DetalleProducto({ agregarAlCarrito }) {
  const { id } = useParams()

  const producto = productosIniciales.find(
    (producto) => producto.id === Number(id)
  )

  if (!producto) {
    return (
      <main className="container py-5">
        <div className="alert alert-danger text-center" role="alert">
          <h2 className="h4 mb-3">Producto no encontrado</h2>
          <p className="mb-0">
            El producto que estás buscando no existe en el catálogo.
          </p>
        </div>

        <div className="text-center">
          <Link to="/" className="btn btn-primary">
            Volver al catálogo
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-md-6">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded shadow product-detail-img"
          />
        </div>

        <div className="col-md-6">
          <span className="badge bg-primary mb-3">
            {producto.categoria}
          </span>

          <h1 className="fw-bold mb-3">
            {producto.nombre}
          </h1>

          <p className="lead text-muted">
            {producto.descripcion}
          </p>

          <hr />

          <p className="fs-5 mb-2">
            <strong>Precio:</strong> ${producto.precio.toLocaleString('es-CL')}
          </p>

          <p className="fs-5 mb-4">
            <strong>Stock disponible:</strong> {producto.stock} unidades
          </p>

          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-primary"
              onClick={() => agregarAlCarrito(producto)}
            >
              Agregar al carrito
            </button>

            <Link to="/" className="btn btn-outline-secondary">
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default DetalleProducto