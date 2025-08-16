// Array para almacenar la lista de amigos.
let amigos = [];

/**
 * Agrega un nuevo amigo a la lista desde el campo de texto.
 */
function agregarAmigo() {
    // Obtiene el elemento del input y su valor.
    let inputAmigo = document.getElementById('amigo');
    let nombre = inputAmigo.value.trim();

    // Valida que el campo no esté vacío.
    if (nombre === '') {
        alert('Por favor, inserte un nombre.');
        return;
    }
    
    // Valida si el nombre ya existe para evitar duplicados.
    if (amigos.includes(nombre)) {
        alert('Ese nombre ya ha sido agregado. Intenta con otro.');
        inputAmigo.value = '';
        return;
    }

    // Agrega el nuevo nombre al array.
    amigos.push(nombre);
    
    // Llama a la función para actualizar la lista en la pantalla.
    actualizarListaAmigos();

    // Limpia el campo de texto y lo vuelve a enfocar.
    inputAmigo.value = '';
    inputAmigo.focus();
}

/**
 * Muestra la lista de amigos en la pantalla.
 */
function actualizarListaAmigos() {
    // Obtener el elemento de la lista del HTML.
    const lista = document.getElementById('listaAmigos');
    
    // Limpiar la lista existente para no duplicar nombres.
    lista.innerHTML = '';

    // Iterar sobre el array para agregar cada amigo a la lista.
    for (let i = 0; i < amigos.length; i++) {
        // Agregar cada amigo como un elemento <li>.
        lista.innerHTML += `<li>${amigos[i]}</li>`;
    }
}