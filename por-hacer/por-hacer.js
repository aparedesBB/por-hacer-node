const fs = require('fs');

let listaPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listaPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err)
            throw new Error('No se pudo guardar.', err);
    });
};

const cargarDB = () => {
    try {
        listaPorHacer = require('../db/data.json');
    } catch (error) {
        listaPorHacer = [];
    }
};

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    }
    listaPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
};

const listar = (filtro) => {
    cargarDB();
    if (filtro != null) {
        let nuevaLista = listaPorHacer.filter(tarea => String(tarea.completado) === filtro);
        return nuevaLista;
    }
    return listaPorHacer;
};

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listaPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listaPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }
    return false;
};

const borrar = (descripcion) => {
    cargarDB();
    let nuevaLista = listaPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (nuevaLista.length === listaPorHacer.length) {
        return false;
    } else {
        listaPorHacer = nuevaLista;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    listar,
    actualizar,
    borrar
};