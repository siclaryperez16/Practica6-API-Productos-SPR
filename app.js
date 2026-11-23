const express = require('express')
const app = express()

app.use(express.json())

const productos = [
    {
        id: 1,
        nombre: 'Teclado inalambrico',
        descripcion: 'Teclado 101 teclas idioma ingles',
        precio: 1500.00
    },
    {
        id: 2,
        nombre: 'Mouse inalambrico',
        descripcion: 'Mouse optico inalambrico.',
        precio: 600.00
    },
    {
        id: 3,
        nombre: 'Monitor 23.5 pulgadas full hd',
        descripcion: 'Monitor Full HD panel IPS',
        precio: 6500.00
    }
]

// GET - Listar todos los productos
app.get('/productos', (req, res) => {
    res.json(productos)
})

// GET - Obtener un producto por id
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productos.find(p => p.id === id)

    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    res.json(producto)
})


// ============================================================
// PRÁCTICA 6: Completa los siguientes métodos de la API
// ============================================================

// TODO: POST /productos - Crear nuevo producto
app.post('/productos', (req, res) => {
    const { nombre, descripcion, precio } = req.body

    // Validar que todos los campos sean obligatorios
    if (!nombre || !descripcion || precio === undefined || precio === null || precio === '') {
        return res.status(400).json({
            mensaje: 'El nombre, la descripcion y el precio son obligatorios'
        })
    }

    // Generar un nuevo id
    const nuevoId = productos.length > 0
        ? Math.max(...productos.map(p => p.id)) + 1
        : 1

    // Crear el nuevo producto
    const nuevoProducto = {
        id: nuevoId,
        nombre,
        descripcion,
        precio: parseFloat(precio)
    }

    // Agregar el producto al arreglo
    productos.push(nuevoProducto)

    // Responder con el producto creado
    res.status(201).json(nuevoProducto)
})


// TODO: PUT /productos/:id - Actualizar producto
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    // Buscar la posicion del producto
    const indice = productos.findIndex(p => p.id === id)

    // Verificar si el producto existe
    if (indice === -1) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        })
    }

    const { nombre, descripcion, precio } = req.body

    // Validar los campos obligatorios
    if (!nombre || !descripcion || precio === undefined || precio === null || precio === '') {
        return res.status(400).json({
            mensaje: 'El nombre, la descripcion y el precio son obligatorios'
        })
    }

    // Crear el producto actualizado conservando su id
    const productoActualizado = {
        id: id,
        nombre,
        descripcion,
        precio: parseFloat(precio)
    }

    // Reemplazar el producto anterior
    productos[indice] = productoActualizado

    res.status(200).json(productoActualizado)
})

// TODO: DELETE /productos/:id - Eliminar producto
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    // Buscar la posicion del producto
    const indice = productos.findIndex(p => p.id === id)

    // Verificar si el producto existe
    if (indice === -1) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        })
    }

    // Eliminar el producto del arreglo
    const productoEliminado = productos.splice(indice, 1)

    // Responder con la confirmacion
    res.status(200).json({
        mensaje: 'Producto eliminado',
        producto: productoEliminado[0]
    })
})

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
