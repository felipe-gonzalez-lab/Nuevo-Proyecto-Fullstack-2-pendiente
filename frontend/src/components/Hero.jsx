function Hero() {
  return (
    <section className="hero-section text-white">
      <div className="container py-5">
        <div className="row align-items-center min-vh-100">
          <div className="col-md-6">
            <h1 className="display-4 fw-bold">
              Tecnología para estudiar, trabajar y crear
            </h1>
            <p className="lead">
              Encuentra notebooks, accesorios y monitores con una experiencia de compra simple,
              rápida y segura.
            </p>
            <a href="#productos" className="btn btn-primary btn-lg">
              Ver productos
            </a>
          </div>

          <div className="col-md-6">
            <div
              id="carruselTecnologia"
              className="carousel slide shadow rounded"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner rounded">
                <div className="carousel-item active">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80"
                    className="d-block w-100 carousel-img"
                    alt="Notebook sobre escritorio de trabajo"
                  />
                </div>

                <div className="carousel-item">
                  <img
                    src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80"
                    className="d-block w-100 carousel-img"
                    alt="Monitor de computador"
                  />
                </div>

                <div className="carousel-item">
                  <img
                    src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80"
                    className="d-block w-100 carousel-img"
                    alt="Teclado tecnológico"
                  />
                </div>
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carruselTecnologia"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
              </button>

              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carruselTecnologia"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero