# 🎁 Challenge Amigo Secreto — Oracle ONE G9

> Aplicación web para organizar sorteos de **Amigo Secreto** de forma justa, accesible y segura.  
> Desarrollada con HTML5, CSS3 y JavaScript Vanilla · Sin dependencias · Sin instalación.

![Interfaz de la aplicación Amigo Secreto](assets/amigo-secreto.png)

---

## 📖 Descripción

**Challenge Amigo Secreto** es una aplicación web interactiva que permite a cualquier grupo de personas organizar un intercambio de regalos de manera sencilla y completamente aleatoria.

El usuario agrega los nombres de los participantes, y la aplicación se encarga de emparejar a cada persona con su amigo secreto de forma automática, garantizando que **nadie se saque a sí mismo**. Ideal para reuniones familiares, de amigos o eventos de oficina.

Este proyecto fue desarrollado como parte del programa **Oracle ONE G9** en colaboración con **Alura Latam**, aplicando buenas prácticas de desarrollo web moderno.

---

## ✨ Mejoras Técnicas Destacadas

### 🔀 Algoritmo Fisher-Yates — Emparejamiento Justo
En lugar de elegir un ganador al azar, la aplicación implementa el **algoritmo Fisher-Yates** combinado con un bucle de *derangement* (permutación sin puntos fijos). Esto garantiza que:
- Cada participante recibe exactamente un amigo secreto.
- **Nadie puede sacarse a sí mismo** en ningún sorteo.
- La distribución es verdaderamente uniforme y aleatoria.

```javascript
function generarAsignacionValida(lista) {
    let permutacion;
    do {
        permutacion = fisherYates([...lista]);
    } while (permutacion.some((valor, idx) => valor === lista[idx]));
    return permutacion;
}
```

### ♿ Accesibilidad — Etiquetas Semánticas y ARIA
El HTML fue reescrito siguiendo los estándares **WCAG** para garantizar compatibilidad con lectores de pantalla y navegación por teclado:
- Estructura semántica completa: `<main>`, `<header>`, `<section>`, `<footer>`.
- `<label class="sr-only">` asociado al campo de texto (visible solo para lectores de pantalla).
- `role="status"` y `aria-live="polite"` en el área de resultados.
- `aria-label` descriptivo en cada botón de eliminar participante.
- Todos los elementos interactivos mantienen un `focus-visible` con outline de alto contraste.

### 🛡️ Seguridad — Prevención de XSS
La versión original usaba `innerHTML` para insertar nombres en el DOM, lo cual permite ataques de **Cross-Site Scripting (XSS)**. La versión refactorizada usa exclusivamente `createElement` y `textContent`:

```javascript
// ❌ Antes — vulnerable
lista.innerHTML += `<li>${amigos[i]}</li>`;

// ✅ Después — seguro
const span = document.createElement('span');
span.textContent = nombre; // escapa HTML automáticamente
```

### 📱 Diseño Responsive — CSS `clamp()` y Flexbox
El diseño se adapta fluidamente a cualquier tamaño de pantalla sin saltos bruscos:
- **`clamp()`** en títulos: escalan automáticamente entre el tamaño mínimo y máximo según el viewport.
- **Flexbox** en todos los contenedores para alineación consistente.
- **`@media (max-width: 480px)`**: el campo de texto y los botones pasan a disposición en columna vertical, optimizados para mobile.

```css
.main-title {
    font-size: clamp(2rem, 8vw, 3rem);
}
```

### 💬 UX Mejorada — Errores Inline y Tecla Enter
Se eliminaron todos los `alert()` del código original, reemplazándolos por mensajes de error **directamente en la página**, más sutiles y no bloqueantes:
- El mensaje aparece en rojo bajo el campo de texto.
- Desaparece automáticamente después de 3.5 segundos.
- El usuario puede agregar participantes presionando **Enter** sin necesidad de hacer clic en el botón.
- El botón "Sortear" permanece **deshabilitado** hasta que haya al menos 2 participantes.

---

## 🚀 Cómo Usar el Proyecto

No se requiere instalación ni dependencias externas.

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/alemakey/challenge-amigo-secreto.git
   ```
2. **Navega a la carpeta del proyecto:**
   ```bash
   cd challenge-amigo-secreto
   ```
3. **Abre `index.html`** en tu navegador web preferido.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura semántica y accesibilidad |
| **CSS3** | Diseño responsive, animaciones y variables CSS |
| **JavaScript (Vanilla)** | Lógica de aplicación, manipulación del DOM, algoritmos |

---

## 📁 Estructura del Proyecto

```
📂 challenge-amigo-secreto/
├── 📄 index.html                 # Estructura semántica de la página
├── 🎨 style.css                  # Estilos, variables CSS y media queries
├── 📜 app.js                     # Lógica de la aplicación (Fisher-Yates, validaciones)
└── 🖼️  assets/
    ├── amigo-secreto.png          # Ilustración principal
    └── play_circle_outline.png    # Ícono del botón de sorteo
```

---

## ✒️ Autor

Desarrollado con ❤️ por **Victor Martinez Reyna**  
📌 Programa **Oracle ONE G9** · Alura Latam
