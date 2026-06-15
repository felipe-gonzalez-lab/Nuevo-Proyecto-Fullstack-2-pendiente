import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

function GraficoStock({ productos }) {
  const datosGrafico = productos.map((producto) => ({
    nombre: producto.nombre,
    stock: producto.stock
  }))

  return (
    <div className="card shadow-sm border-0 mt-4">
      <div className="card-body">
        <h4 className="fw-bold mb-3">Stock por producto</h4>

        <p className="text-muted">
          Este gráfico permite visualizar rápidamente la cantidad de unidades disponibles
          por cada producto de la tienda.
        </p>

        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <BarChart data={datosGrafico}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="nombre"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-25}
                textAnchor="end"
                height={90}
              />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="stock" name="Stock disponible" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default GraficoStock