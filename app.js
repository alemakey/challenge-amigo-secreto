// Array para almacenar la lista de amigos.
let amigos = [];

/**
 * Agrega un nuevo amigo a la lista desde el campo de texto.
 */
function agregarAmigo() {
    let inputAmigo = document.getElementById('amigo');
    let nombre = inputAmigo.value.trim();

    if (nombre === '') {
        mostrarToast('Por favor, inserte un nombre.', 'error');
        return;
    }

    if (amigos.includes(nombre)) {
        mostrarToast('Ese nombre ya ha sido agregado. Intenta con otro.', 'error');
        inputAmigo.value = '';
        return;
    }

    amigos.push(nombre);
    actualizarListaAmigos();
    inputAmigo.value = '';
    inputAmigo.focus();
}

/**
 * Muestra la lista de amigos en la pantalla de forma eficiente y segura.
 */
function actualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = ''; // Limpiar la lista existente

    // Crear un DocumentFragment para mejorar el rendimiento
    const fragment = document.createDocumentFragment();

    // Agregar contador de participantes si hay amigos
    if (amigos.length > 0) {
        const contador = document.createElement('div');
        contador.className = 'participants-counter';
        contador.textContent = `👥 Participantes: ${amigos.length}`;
        fragment.appendChild(contador);
    }

    // Iterar sobre el array para agregar cada amigo
    amigos.forEach((amigo, i) => {
        // Crear el elemento <li> principal
        const itemLista = document.createElement('li');
        itemLista.className = 'friend-item';

        // Crear el <span> para el nombre
        const nombreAmigo = document.createElement('span');
        nombreAmigo.className = 'friend-name';
        nombreAmigo.textContent = amigo; // Usar textContent previene ataques XSS

        // Crear el botón de eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.className = 'button-remove';
        botonEliminar.textContent = '❌ Eliminar';
        botonEliminar.title = `Eliminar a ${amigo}`;
        
        // Añadir el evento de forma segura
        botonEliminar.addEventListener('click', () => eliminarAmigo(i));

        // Ensamblar el elemento de la lista
        itemLista.appendChild(nombreAmigo);
        itemLista.appendChild(botonEliminar);

        // Añadir el elemento completo al fragmento
        fragment.appendChild(itemLista);
    });

    // Añadir el fragmento completo al DOM en una sola operación
    lista.appendChild(fragment);
}

/**
 * Inicia el proceso para eliminar un amigo, mostrando un modal de confirmación.
 * @param {number} indice - El índice del amigo a eliminar.
 */
function eliminarAmigo(indice) {
    const nombre = amigos[indice];
    const modal = document.getElementById('modal-confirmacion');
    const mensajeModal = document.getElementById('modal-mensaje');
    const btnConfirmar = document.getElementById('modal-btn-confirmar');
    const btnCancelar = document.getElementById('modal-btn-cancelar');

    mensajeModal.textContent = `¿Estás seguro de que quieres eliminar a "${nombre}" de la lista?`;

    // Mostrar el modal
    modal.classList.add('visible');

    // Limpiar listeners anteriores
    btnConfirmar.onclick = null;
    btnCancelar.onclick = null;

    btnConfirmar.onclick = () => {
        amigos.splice(indice, 1);
        actualizarListaAmigos();
        if (amigos.length < 2) {
            document.getElementById('resultado').innerHTML = '';
        }
        mostrarToast(`${nombre} ha sido eliminado de la lista.`, 'success');
        modal.classList.remove('visible');
    };

    btnCancelar.onclick = () => {
        modal.classList.remove('visible');
    };
}

/**
 * Realiza el sorteo de amigo secreto para todos los participantes.
 */
function sortearAmigo() {
    if (amigos.length < 2) {
        mostrarToast('Debes agregar al menos 2 amigos para poder sortear.', 'error');
        return;
    }

    // Copia y desordena la lista de amigos
    let asignados = [...amigos];
    let intentos = 0;
    let maxIntentos = 100;

    // Evitar autoasignaciones
    do {
        asignados = shuffle([...amigos]);
        intentos++;
    } while (tieneAutoasignacion(amigos, asignados) && intentos < maxIntentos);

    if (intentos === maxIntentos) {
        mostrarToast('No se pudo realizar el sorteo. Intenta de nuevo.', 'error');
        return;
    }

    // Mostrar los resultados
    let resultadoHTML = '<ul>';
    amigos.forEach((amigo, i) => {
        resultadoHTML += `<li><strong>${amigo}</strong> → ${asignados[i]}</li>`;
    });
    resultadoHTML += '</ul>';

    document.getElementById('resultado').innerHTML = resultadoHTML;
}

/**
 * Desordena un array (Fisher-Yates).
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Verifica si hay autoasignaciones.
 */
function tieneAutoasignacion(original, asignados) {
    return original.some((amigo, i) => amigo === asignados[i]);
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

/**
 * Muestra una notificación "toast" no bloqueante.
 * @param {string} mensaje - El mensaje a mostrar.
 * @param {string} [tipo='success'] - El tipo de toast ('success' o 'error').
 */
function mostrarToast(mensaje, tipo = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.textContent = mensaje;
    container.appendChild(toast);

    // La animación CSS se encarga de mostrar y ocultar.
    // Removemos el elemento del DOM después de que la animación termine.
    setTimeout(() => {
        toast.remove();
    }, 3000); // 3000ms = 3s
}