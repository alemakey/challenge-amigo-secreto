/**
 * Amigo Secreto — app.js
 * Lógica principal refactorizada.
 */

'use strict';

// ─── Estado ───────────────────────────────────────────────────────────────────
/** @type {string[]} Lista de nombres de participantes */
const amigos = [];

// ─── Referencias al DOM ───────────────────────────────────────────────────────
const inputAmigo   = document.getElementById('amigo');
const btnAgregar   = document.getElementById('btn-agregar');
const btnSortear   = document.getElementById('btn-sortear');
const btnReiniciar = document.getElementById('btn-reiniciar');
const listaAmigos  = document.getElementById('listaAmigos');
const resultado    = document.getElementById('resultado');
const errorMsg     = document.getElementById('error-msg');

// ─── Event Listeners ─────────────────────────────────────────────────────────
btnAgregar.addEventListener('click', agregarAmigo);
btnSortear.addEventListener('click', sortearAmigo);
btnReiniciar.addEventListener('click', reiniciar);

/** Permite agregar un amigo pulsando Enter en el input */
inputAmigo.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') agregarAmigo();
});

// ─── Utilidades ──────────────────────────────────────────────────────────────

/**
 * Muestra un mensaje de error inline y lo limpia después de 3 segundos.
 * @param {string} mensaje
 */
function mostrarError(mensaje) {
    errorMsg.textContent = mensaje;
    clearTimeout(mostrarError._timer);
    mostrarError._timer = setTimeout(() => { errorMsg.textContent = ''; }, 3500);
}

/**
 * Capitaliza la primera letra y pone el resto en minúsculas.
 * @param {string} str
 * @returns {string}
 */
function capitalizar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Actualiza el estado habilitado/deshabilitado del botón sortear.
 */
function actualizarEstadoBoton() {
    const suficientes = amigos.length >= 2;
    btnSortear.disabled      = !suficientes;
    btnSortear.ariaDisabled  = String(!suficientes);
}

// ─── Core ─────────────────────────────────────────────────────────────────────

/**
 * Valida y agrega un nuevo participante a la lista.
 */
function agregarAmigo() {
    const nombre = capitalizar(inputAmigo.value.trim());

    // Validación: campo vacío
    if (!nombre) {
        mostrarError('⚠️ Por favor, escribe un nombre antes de añadir.');
        inputAmigo.focus();
        return;
    }

    // Validación: duplicados (case-insensitive)
    const existeDuplicado = amigos.some(
        (a) => a.toLowerCase() === nombre.toLowerCase()
    );
    if (existeDuplicado) {
        mostrarError(`⚠️ "${nombre}" ya está en la lista. Prueba con otro nombre.`);
        inputAmigo.value = '';
        inputAmigo.focus();
        return;
    }

    // Limpiar error previo si había uno
    errorMsg.textContent = '';

    // Agregar al array y al DOM
    amigos.push(nombre);
    renderizarParticipante(nombre);

    // Limpiar input
    inputAmigo.value = '';
    inputAmigo.focus();

    actualizarEstadoBoton();
}

/**
 * Crea y agrega un elemento <li> para un participante de forma segura (sin innerHTML).
 * @param {string} nombre
 */
function renderizarParticipante(nombre) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = nombre;

    const btn = document.createElement('button');
    btn.type      = 'button';
    btn.className = 'btn-remove';
    btn.textContent = '✕';
    btn.setAttribute('aria-label', `Eliminar a ${nombre}`);
    btn.addEventListener('click', () => eliminarAmigo(nombre, li));

    li.appendChild(span);
    li.appendChild(btn);
    listaAmigos.appendChild(li);
}

/**
 * Elimina un participante del array y del DOM.
 * @param {string} nombre
 * @param {HTMLLIElement} elemento
 */
function eliminarAmigo(nombre, elemento) {
    const idx = amigos.indexOf(nombre);
    if (idx !== -1) amigos.splice(idx, 1);
    elemento.remove();
    actualizarEstadoBoton();
    // Si había un resultado visible, lo limpiamos al modificar la lista
    resultado.innerHTML = '';
}

/**
 * Asigna a cada participante un amigo secreto usando Fisher-Yates shuffle,
 * garantizando que nadie se saque a sí mismo.
 */
function sortearAmigo() {
    if (amigos.length < 2) {
        mostrarError('⚠️ Necesitas al menos 2 participantes para sortear.');
        return;
    }

    // Genera una asignación válida (sin nadie consigo mismo)
    let asignacion = generarAsignacionValida(amigos);

    // Renderizar resultados
    resultado.innerHTML = '';

    const titulo = document.createElement('p');
    titulo.className = 'result-title';
    titulo.textContent = '🎉 ¡Resultados del sorteo!';
    resultado.appendChild(titulo);

    const ul = document.createElement('ul');
    amigos.forEach((nombre, i) => {
        const li = document.createElement('li');

        const dador  = document.createElement('strong');
        dador.textContent = nombre;

        const flecha = document.createElement('span');
        flecha.className = 'arrow';
        flecha.textContent = '→';
        flecha.setAttribute('aria-hidden', 'true');

        const receptor = document.createElement('strong');
        receptor.textContent = asignacion[i];

        li.appendChild(dador);
        li.appendChild(flecha);
        li.appendChild(receptor);
        ul.appendChild(li);
    });

    resultado.appendChild(ul);
}

/**
 * Genera una permutación aleatoria (Fisher-Yates) donde ningún índice
 * queda en su posición original (derangement).
 * @param {string[]} lista
 * @returns {string[]} lista permutada
 */
function generarAsignacionValida(lista) {
    let permutacion;

    do {
        permutacion = fisherYates([...lista]);
    } while (permutacion.some((valor, idx) => valor === lista[idx]));

    return permutacion;
}

/**
 * Implementación del algoritmo Fisher-Yates para mezclar un array en su lugar.
 * @param {string[]} arr
 * @returns {string[]}
 */
function fisherYates(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Reinicia el estado completo de la aplicación.
 */
function reiniciar() {
    amigos.length = 0;               // vacía el array sin perder la referencia
    listaAmigos.innerHTML = '';
    resultado.innerHTML   = '';
    errorMsg.textContent  = '';
    inputAmigo.value      = '';
    inputAmigo.focus();
    actualizarEstadoBoton();
}
