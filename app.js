// Array para almacenar la lista de amigos.
let amigos = [];

/**
 * Agrega un nuevo amigo a la lista desde el campo de texto.
 */
function agregarAmigo() {
    // Obtiene el elemento del input y su valor.
    let inputAmigo = document.getElementById('amigo');
    let nombre = inputAmigo.value.trim(); // .trim() elimina espacios en blanco

    // Valida que el campo no esté vacío.
    if (nombre === '') {
        alert('Por favor, inserte un nombre.');
        return; // Detiene la función si no hay nombre.
    }

    // Agrega el nuevo nombre al array.
    amigos.push(nombre);
    
    // Limpia el campo de texto y lo vuelve a enfocar para el siguiente ingreso.
    inputAmigo.value = '';
    inputAmigo.focus();
}
