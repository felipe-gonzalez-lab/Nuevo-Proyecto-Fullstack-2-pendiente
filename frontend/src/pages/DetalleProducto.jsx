import { useParams, Link } from 'react-router-dom'

function DetalleProducto({ productos, agregarAlCarrito }) {
  const { id } = useParams()

  const producto = productos.find((item) => item.id === Number(id))

  if (!producto) {
    return (
      <main className="container my-5">
        <h2 className="fw-bold">Producto no encontrado</h2>

        <p className="text-muted">
          El producto que estás buscando no existe o ya no está disponible.
        </p>

        <Link to="/" className="btn btn-primary mt-3">
          Volver al catálogo
        </Link>
      </main>
    )
  }

  return (
    <main className="container my-5">
      <div className="row g-4 align-items-center">
        <div className="col-md-6">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-md-6">
          <span className="badge bg-secondary mb-3">
            {producto.categoria}
          </span>

          <h1 className="fw-bold mb-3">
            {producto.nombre}
          </h1>

          <h3 className="text-primary fw-bold mb-3">
            ${producto.precio.toLocaleString('es-CL')}
          </h3>

          <p className="text-muted">
            {producto.descripcion}
          </p>

          <p className="mb-3">
            <strong>Stock disponible:</strong>{' '}
            {producto.stock > 0 ? producto.stock : 'Sin stock'}
          </p>

          {producto.stock > 0 ? (
            <button
              className="btn btn-primary me-2"
              onClick={() => agregarAlCarrito(producto)}
            >
              Agregar al carrito
            </button>
          ) : (
            <button className="btn btn-secondary me-2" disabled>
              Sin stock
            </button>
          )}

          <Link to="/" className="btn btn-outline-secondary">
            Volver al catálogo
          </Link>
        </div>
      </div>
    </main>
  )
}

export default DetalleProducto