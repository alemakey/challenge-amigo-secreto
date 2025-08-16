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

/**
 * Realiza el sorteo y muestra el amigo secreto.
 */
function sortearAmigo() {
    // Validar que haya amigos disponibles (al menos 2).
    if (amigos.length < 2) {
        alert('Debes agregar al menos 2 amigos para poder sortear.');
        return;
    }

    // Generar un índice aleatorio.
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);

    // Obtener el nombre sorteado.
    const amigoSecreto = amigos[indiceAleatorio];

    // Mostrar el resultado en la pantalla.
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `¡El amigo secreto es: <strong>${amigoSecreto}</strong>! 🎉`;
}

/**
 * Limpia la lista de amigos y los resultados para empezar de nuevo.
 */
function reiniciar() {
    amigos = [];
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('amigo').focus();
}
