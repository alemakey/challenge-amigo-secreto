// Array para almacenar la lista de amigos.
let amigos =;

/**
 * Agrega un nuevo amigo a la lista desde el campo de texto.
 */
function agregarAmigo() {
    // Obtiene el elemento del input y su valor.
    let inputAmigo = document.getElementById('amigo');
    let nombre = inputAmigo.value.trim();

    // Valida que el campo no esté vacío.
    if (nombre === '') {
        mostrarToast('Por favor, inserte un nombre.', 'error');
        return;
    }
    
    // Valida si el nombre ya existe para evitar duplicados.
    if (amigos.includes(nombre)) {
        mostrarToast('Ese nombre ya ha sido agregado. Intenta con otro.', 'error');
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

    const cerrarModal = () => {
        modal.classList.remove('visible');
        // Importante: Clonar y reemplazar los botones para eliminar los event listeners antiguos
        btnConfirmar.replaceWith(btnConfirmar.cloneNode(true));
        btnCancelar.replaceWith(btnCancelar.cloneNode(true));
    };

    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('visible'), 10);

    document.getElementById('modal-btn-confirmar').onclick = () => {
        amigos.splice(indice, 1);
        actualizarListaAmigos();
        if (amigos.length < 2) {
            document.getElementById('resultado').innerHTML = '';
        }
        mostrarToast(`${nombre} ha sido eliminado de la lista.`, 'success');
        cerrarModal();
    };

    document.getElementById('modal-btn-cancelar').onclick = cerrarModal;
}

/**
 * Realiza el sorteo y muestra el amigo secreto.
 */
function sortearAmigo() {
    if (amigos.length < 2) {
        mostrarToast('Debes agregar al menos 2 amigos para poder sortear.', 'error');
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSecreto = amigos[indiceAleatorio];

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `¡El amigo secreto es: <strong>${amigoSecreto}</strong>! 🎉`;
}

/**
 * Limpia la lista de amigos y los resultados para empezar de nuevo.
 */
function reiniciar() {
    amigos =;
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('amigo').focus();
}

/**
 * Muestra una notificación "toast" no bloqueante.
 * @param {string} mensaje - El mensaje a mostrar.
 * @param {string} tipo - 'success' o 'error' para el estilo.
 */
function mostrarToast(mensaje, tipo = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.textContent = mensaje;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}