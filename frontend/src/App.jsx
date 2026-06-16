import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { productosIniciales } from './data/productos'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CatalogoProductos from './components/CatalogoProductos'
import Carrito from './components/Carrito'
import FormularioContacto from './components/FormularioContacto'
import Footer from './components/Footer'
import DetalleProducto from './pages/DetalleProducto'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'

import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProductoPorId
} from './services/productosService'

import {
  obtenerPedidos,
  crearPedidoBackend,
  actualizarEstadoPedidoBackend
} from './services/pedidosService'

function App() {
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [carrito, setCarrito] = useState([])
  const [direccionPedido, setDireccionPedido] = useState('')

  const [productos, setProductos] = useState([])

  const [pedidos, setPedidos] = useState([])

  const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado')
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null
  })

  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  })

  const [errores, setErrores] = useState({})
  const [mensajeEnviado, setMensajeEnviado] = useState('')
  const [mensajePedido, setMensajePedido] = useState('')

  const usuarios = [
    {
      correo: 'cliente@tecnostore.cl',
      clave: '1234',
      nombre: 'Cliente',
      rol: 'cliente'
    },
    {
      correo: 'admin@tecnostore.cl',
      clave: 'admin123',
      nombre: 'Administrador',
      rol: 'admin'
    }
  ]

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productosBackend = await obtenerProductos()
        setProductos(productosBackend)
      } catch (error) {
        console.error(error)
        setProductos(productosIniciales)
      }
    }

    cargarProductos()
  }, [])

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const pedidosBackend = await obtenerPedidos()
        setPedidos(pedidosBackend)
      } catch (error) {
        console.error(error)
      }
    }

    cargarPedidos()
  }, [])

  useEffect(() => {
    if (usuarioLogueado) {
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado))
    } else {
      localStorage.removeItem('usuarioLogueado')
    }
  }, [usuarioLogueado])

  const iniciarSesion = (correo, clave) => {
    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.correo === correo && usuario.clave === clave
    )

    if (!usuarioEncontrado) {
      return null
    }

    setUsuarioLogueado(usuarioEncontrado)
    return usuarioEncontrado
  }

  const cerrarSesion = () => {
    setUsuarioLogueado(null)
  }

  const usuarioActual = usuarioLogueado ? usuarioLogueado.rol : 'cliente'

  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase())

    const coincideCategoria =
      categoria === 'Todas' || producto.categoria === categoria

    return coincideNombre && coincideCategoria
  })

  const agregarAlCarrito = (producto) => {
    const productoActual = productos.find((item) => item.id === producto.id)

    if (!productoActual || productoActual.stock <= 0) {
      setMensajePedido('No hay stock disponible para este producto.')
      return
    }

    const productoExiste = carrito.find((item) => item.id === producto.id)

    if (productoExiste) {
      const carritoActualizado = carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )

      setCarrito(carritoActualizado)
    } else {
      setCarrito([...carrito, { ...productoActual, cantidad: 1 }])
    }

    const productosActualizados = productos.map((item) =>
      item.id === producto.id
        ? { ...item, stock: item.stock - 1 }
        : item
    )

    setProductos(productosActualizados)
    setMensajePedido('')
  }

  const aumentarCantidad = (idProducto) => {
    const productoActual = productos.find(
      (producto) => producto.id === idProducto
    )

    if (!productoActual || productoActual.stock <= 0) {
      setMensajePedido('No hay más stock disponible para este producto.')
      return
    }

    const carritoActualizado = carrito.map((item) =>
      item.id === idProducto
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    )

    const productosActualizados = productos.map((producto) =>
      producto.id === idProducto
        ? { ...producto, stock: producto.stock - 1 }
        : producto
    )

    setCarrito(carritoActualizado)
    setProductos(productosActualizados)
    setMensajePedido('')
  }

  const disminuirCantidad = (idProducto) => {
    const productoEnCarrito = carrito.find((item) => item.id === idProducto)

    if (!productoEnCarrito) return

    const carritoActualizado = carrito
      .map((item) =>
        item.id === idProducto
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
      .filter((item) => item.cantidad > 0)

    const productosActualizados = productos.map((producto) =>
      producto.id === idProducto
        ? { ...producto, stock: producto.stock + 1 }
        : producto
    )

    setCarrito(carritoActualizado)
    setProductos(productosActualizados)
    setMensajePedido('')
  }

  const eliminarDelCarrito = (idProducto) => {
    const productoEliminado = carrito.find((item) => item.id === idProducto)

    if (productoEliminado) {
      const productosActualizados = productos.map((producto) =>
        producto.id === idProducto
          ? { ...producto, stock: producto.stock + productoEliminado.cantidad }
          : producto
      )

      setProductos(productosActualizados)
    }

    const carritoActualizado = carrito.filter((item) => item.id !== idProducto)
    setCarrito(carritoActualizado)
    setMensajePedido('')
  }

  const vaciarCarrito = () => {
    const productosActualizados = productos.map((producto) => {
      const productoEnCarrito = carrito.find((item) => item.id === producto.id)

      if (productoEnCarrito) {
        return {
          ...producto,
          stock: producto.stock + productoEnCarrito.cantidad
        }
      }

      return producto
    })

    setProductos(productosActualizados)
    setCarrito([])
    setMensajePedido('')
  }

  const crearPedido = async () => {
    if (!usuarioLogueado) {
      setMensajePedido('Debes iniciar sesión para crear un pedido.')
      return
    }

    if (carrito.length === 0) {
      setMensajePedido('No puedes crear un pedido con el carrito vacío.')
      return
    }

    if (direccionPedido.trim().length < 5) {
      setMensajePedido('Debes ingresar una dirección de entrega válida.')
      return
    }

    const nuevoPedido = {
      cliente: usuarioLogueado.nombre,
      correoCliente: usuarioLogueado.correo,
      direccion: direccionPedido.trim(),
      productos: carrito,
      total: totalCarrito
    }

    try {
      await crearPedidoBackend(nuevoPedido)

      const pedidosActualizados = await obtenerPedidos()
      setPedidos(pedidosActualizados)

      setMensajePedido('Pedido creado correctamente. Estado inicial: Pendiente.')
      setCarrito([])
      setDireccionPedido('')
    } catch (error) {
      alert(error.message)
    }
  }

  const actualizarEstadoPedido = async (idPedido, nuevoEstado) => {
    try {
      await actualizarEstadoPedidoBackend(idPedido, nuevoEstado)

      const pedidosActualizados = await obtenerPedidos()
      setPedidos(pedidosActualizados)
    } catch (error) {
      alert(error.message)
    }
  }

  const actualizarStock = async (idProducto, nuevoStock) => {
    const stockValidado =
      nuevoStock === '' || nuevoStock === null ? 0 : Number(nuevoStock)

    if (Number.isNaN(stockValidado)) return
    if (stockValidado < 0) return
    if (stockValidado > 50) return
    if (!Number.isInteger(stockValidado)) return

    const productoActual = productos.find((producto) => producto.id === idProducto)

    if (!productoActual) return

    const productoActualizado = {
      ...productoActual,
      stock: stockValidado
    }

    try {
      await actualizarProducto(idProducto, productoActualizado)

      const productosActualizados = await obtenerProductos()
      setProductos(productosActualizados)
    } catch (error) {
      alert(error.message)
    }
  }

  const agregarProducto = async (nuevoProducto) => {
    try {
      await crearProducto(nuevoProducto)

      const productosActualizados = await obtenerProductos()
      setProductos(productosActualizados)
    } catch (error) {
      alert(error.message)
    }
  }

  const editarProducto = async (productoEditado) => {
    try {
      await actualizarProducto(productoEditado.id, productoEditado)

      const productosActualizados = await obtenerProductos()
      setProductos(productosActualizados)

      const carritoActualizado = carrito.map((producto) =>
        producto.id === productoEditado.id
          ? {
              ...producto,
              nombre: productoEditado.nombre,
              categoria: productoEditado.categoria,
              precio: productoEditado.precio,
              imagen: productoEditado.imagen,
              descripcion: productoEditado.descripcion
            }
          : producto
      )

      setCarrito(carritoActualizado)
    } catch (error) {
      alert(error.message)
    }
  }

  const eliminarProducto = async (idProducto) => {
    const confirmar = window.confirm(
      '¿Seguro que deseas eliminar este producto? Esta acción no se puede deshacer.'
    )

    if (!confirmar) return

    try {
      await eliminarProductoPorId(idProducto)

      const productosActualizados = await obtenerProductos()
      setProductos(productosActualizados)

      const carritoActualizado = carrito.filter(
        (producto) => producto.id !== idProducto
      )

      setCarrito(carritoActualizado)
      setMensajePedido('')
    } catch (error) {
      alert(error.message)
    }
  }

  const manejarCambioFormulario = (e) => {
    const { name, value } = e.target

    setFormulario({
      ...formulario,
      [name]: value
    })
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (formulario.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres.'
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.correo)

    if (!correoValido) {
      nuevosErrores.correo = 'Ingresa un correo electrónico válido.'
    }

    if (formulario.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
    }

    return nuevosErrores
  }

  const manejarEnvioFormulario = (e) => {
    e.preventDefault()

    const erroresValidacion = validarFormulario()
    setErrores(erroresValidacion)

    if (Object.keys(erroresValidacion).length === 0) {
      setMensajeEnviado('Tu consulta fue enviada correctamente.')
      setFormulario({
        nombre: '',
        correo: '',
        mensaje: ''
      })
    } else {
      setMensajeEnviado('')
    }
  }

  const totalCarrito = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  )

  const restablecerDatos = () => {
    const confirmar = window.confirm(
      '¿Seguro que deseas restablecer los datos de prueba? Se eliminarán los pedidos y se restaurará el stock inicial.'
    )

    if (!confirmar) return

    setProductos(productosIniciales)
    setPedidos([])
    setCarrito([])
    setDireccionPedido('')
    setMensajePedido('')

    localStorage.removeItem('productos')
  }

  return (
    <BrowserRouter>
      <Navbar
        usuarioActual={usuarioActual}
        usuarioLogueado={usuarioLogueado}
        cerrarSesion={cerrarSesion}
      />

      <Routes>
        <Route
          path="/"
          element={
            <main id="inicio">
              <Hero />

              <CatalogoProductos
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                categoria={categoria}
                setCategoria={setCategoria}
                productosFiltrados={productosFiltrados}
                agregarAlCarrito={agregarAlCarrito}
              />

              <Carrito
                carrito={carrito}
                totalCarrito={totalCarrito}
                aumentarCantidad={aumentarCantidad}
                disminuirCantidad={disminuirCantidad}
                eliminarDelCarrito={eliminarDelCarrito}
                vaciarCarrito={vaciarCarrito}
                crearPedido={crearPedido}
                mensajePedido={mensajePedido}
                direccionPedido={direccionPedido}
                setDireccionPedido={setDireccionPedido}
              />

              <FormularioContacto
                formulario={formulario}
                errores={errores}
                mensajeEnviado={mensajeEnviado}
                manejarCambioFormulario={manejarCambioFormulario}
                manejarEnvioFormulario={manejarEnvioFormulario}
              />
            </main>
          }
        />

        <Route
          path="/login"
          element={
            usuarioLogueado ? (
              <Navigate to="/" />
            ) : (
              <LoginPage iniciarSesion={iniciarSesion} />
            )
          }
        />

        <Route
          path="/producto/:id"
          element={
            <DetalleProducto
              productos={productos}
              agregarAlCarrito={agregarAlCarrito}
            />
          }
        />

        <Route
          path="/admin"
          element={
            usuarioLogueado && usuarioLogueado.rol === 'admin' ? (
              <AdminPage
                productos={productos}
                actualizarStock={actualizarStock}
                agregarProducto={agregarProducto}
                editarProducto={editarProducto}
                eliminarProducto={eliminarProducto}
                pedidos={pedidos}
                actualizarEstadoPedido={actualizarEstadoPedido}
                restablecerDatos={restablecerDatos}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App