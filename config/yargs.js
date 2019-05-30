const opciones = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Descripción de la tarea por hacer.'
    }
}

const argv = require('yargs')
    .command('crear', 'Crea un elemento pendiente.', opciones)
    .command('actualizar', 'Actualiza el estado de una tarea.', {
        descripcion: opciones.descripcion,
        completado: {
            default: true,
            alias: 'c',
            desc: 'Cambia el estado de la tarea.'
        }
    })
    .command('listar', 'Lista las tareas existentes.', {
        filtro: {
            alias: 'f',
            desc: 'Lista las tareas completadas o no completadas true | false'
        }
    })
    .command('borrar', 'Elimina la tarea especificada.', opciones).help().argv;

module.exports = {
    argv
}