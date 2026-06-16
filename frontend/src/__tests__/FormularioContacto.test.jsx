import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import FormularioContacto from '../components/FormularioContacto'

describe('FormularioContacto', () => {
  const formularioVacio = {
    nombre: '',
    correo: '',
    mensaje: ''
  }

  test('muestra los campos del formulario de contacto', () => {
    render(
      <FormularioContacto
        formulario={formularioVacio}
        errores={{}}
        mensajeEnviado=""
        manejarCambioFormulario={vi.fn()}
        manejarEnvioFormulario={vi.fn()}
      />
    )

    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar consulta/i })).toBeInTheDocument()
  })

  test('permite escribir en los campos del formulario', async () => {
    const user = userEvent.setup()
    const manejarCambioFormulario = vi.fn()

    render(
      <FormularioContacto
        formulario={formularioVacio}
        errores={{}}
        mensajeEnviado=""
        manejarCambioFormulario={manejarCambioFormulario}
        manejarEnvioFormulario={vi.fn()}
      />
    )

    await user.type(screen.getByLabelText(/nombre completo/i), 'Militza')
    await user.type(screen.getByLabelText(/correo electrónico/i), 'militza@test.com')
    await user.type(screen.getByLabelText(/mensaje/i), 'Quiero consultar por un producto')

    expect(manejarCambioFormulario).toHaveBeenCalled()
  })

  test('muestra mensajes de error cuando existen errores de validación', () => {
    render(
      <FormularioContacto
        formulario={formularioVacio}
        errores={{
          nombre: 'El nombre es obligatorio',
          correo: 'El correo es obligatorio',
          mensaje: 'El mensaje es obligatorio'
        }}
        mensajeEnviado=""
        manejarCambioFormulario={vi.fn()}
        manejarEnvioFormulario={vi.fn()}
      />
    )

    expect(screen.getByText(/el nombre es obligatorio/i)).toBeInTheDocument()
    expect(screen.getByText(/el correo es obligatorio/i)).toBeInTheDocument()
    expect(screen.getByText(/el mensaje es obligatorio/i)).toBeInTheDocument()
  })

  test('ejecuta la función de envío al enviar el formulario', async () => {
    const user = userEvent.setup()
    const manejarEnvioFormulario = vi.fn((e) => e.preventDefault())

    render(
      <FormularioContacto
        formulario={{
          nombre: 'Militza',
          correo: 'militza@test.com',
          mensaje: 'Quiero consultar por un producto'
        }}
        errores={{}}
        mensajeEnviado=""
        manejarCambioFormulario={vi.fn()}
        manejarEnvioFormulario={manejarEnvioFormulario}
      />
    )

    await user.click(screen.getByRole('button', { name: /enviar consulta/i }))

    expect(manejarEnvioFormulario).toHaveBeenCalledTimes(1)
  })

  test('muestra mensaje de éxito cuando el formulario fue enviado', () => {
    render(
      <FormularioContacto
        formulario={{
          nombre: 'Militza',
          correo: 'militza@test.com',
          mensaje: 'Quiero consultar por un producto'
        }}
        errores={{}}
        mensajeEnviado="Consulta enviada correctamente"
        manejarCambioFormulario={vi.fn()}
        manejarEnvioFormulario={vi.fn()}
      />
    )

    expect(screen.getByRole('alert')).toHaveTextContent(/consulta enviada correctamente/i)
  })
})