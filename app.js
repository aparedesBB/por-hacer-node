const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        let listado = porHacer.listar(argv.filtro);
        console.log('=====Pendientes====='.green);
        for (const tarea of listado) {
            console.log(tarea.descripcion.rainbow);
            console.log('Estado: ', `${tarea.completado}\n`.random);
        }
        console.log('===================='.green);
        break;

    case 'actualizar':
        let act = porHacer.actualizar(argv.descripcion, argv.completado);
        if (act == true) {
            console.log(`Se ha actualizado la tarea ${argv.descripcion}, su estado actual es ${argv.completado}`.green);
        } else {
            console.log(`Error, no se pudo actualizar la tarea ${argv.descripcion}`.zebra);
        }
        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        if (borrado == true) {
            console.log(`La tarea ${argv.descripcion} ha sido eliminada`.red);
        } else {
            console.log(`Error, no se pudo eliminar la tarea ${argv.descripcion}`.yellow);
        }
        break;

    default:
        console.log('Ese no es un comando válido.');
        break;
}