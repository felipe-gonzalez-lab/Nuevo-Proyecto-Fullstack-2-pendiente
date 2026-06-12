import { Link } from 'react-router-dom'

function CatalogoProductos({
  busqueda,
  setBusqueda,
  categoria,
  setCategoria,
  productosFiltrados,
  agregarAlCarrito
}) {
  return (
    <section id="productos" className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Catálogo de productos</h2>
        <p className="text-muted">
          Busca productos por nombre o filtra por categoría.
        </p>
      </div>

      <div className="row mb-4 g-3">
        <div className="col-md-6">
          <label htmlFor="busqueda" className="form-label">
            Buscar producto
          </label>
          <input
            id="busqueda"
            type="text"
            className="form-control"
            placeholder="Ejemplo: notebook, mouse, monitor"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="categoria" className="form-label">
            Filtrar por categoría
          </label>
          <select
            id="categoria"
            className="form-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="Todas">Todas</option>
            <option value="Notebooks">Notebooks</option>
            <option value="Accesorios">Accesorios</option>
            <option value="Monitores">Monitores</option>
          </select>
        </div>
      </div>

      <div className="row g-4">
        {productosFiltrados.length === 0 ? (
          <p className="text-center text-muted">
            No se encontraron productos con esos criterios de búsqueda.
          </p>
        ) : (
          productosFiltrados.map((producto) => (
            <article className="col-md-6 col-lg-4" key={producto.id}>
              <div className="card h-100 shadow-sm product-card">
                <img
                  src={producto.imagen}
                  className="card-img-top product-img"
                  alt={producto.nombre}
                />

                <div className="card-body d-flex flex-column">
                  <span className="badge bg-primary mb-2 align-self-start">
                    {producto.categoria}
                  </span>

                  <h3 className="card-title h5">{producto.nombre}</h3>

                  <p className="card-text text-muted">
                    {producto.descripcion}
                  </p>

                  <p className="mb-1">
                    <strong>Precio:</strong> ${producto.precio.toLocaleString('es-CL')}
                  </p>

                  <p className="mb-3">
                    <strong>Stock:</strong> {producto.stock} unidades
                  </p>

                  <div className="mt-auto d-flex gap-2">
                    <Link
                      to={`/producto/${producto.id}`}
                      className="btn btn-outline-secondary"
                    >
                      Ver producto
                    </Link>

                    <button
                      className="btn btn-outline-primary"
                      onClick={() => agregarAlCarrito(producto)}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default CatalogoProductos