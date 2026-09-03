// ── Toasts ──────────────────────────────────────────────────────────────────
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');

    const colors = {
        success: 'bg-emerald-500 text-white',
        error:   'bg-red-500 text-white',
        info:    'bg-indigo-500 text-white',
    };
    const icons = {
        success: 'check_circle',
        error:   'error',
        info:    'info',
    };

    const toast = document.createElement('div');
    toast.className = `pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-2xl shadow-lg text-sm font-semibold animate-toast-in ${colors[type]}`;
    toast.innerHTML = `
        <span class="material-icons-round text-base">${icons[type]}</span>
        ${message}
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('animate-toast-out');
        toast.addEventListener('animationend', () => toast.remove());
    }, 2800);
}

// ── Votar Tema ──────────────────────────────────────────────────────────────
async function votarTema(id) {
    try {
        const res = await fetch(`/temas/${id}/votar`, { method: 'PUT' });
        if (res.ok) {
            showToast('¡Voto registrado!', 'success');
            setTimeout(() => location.reload(), 600);
        } else {
            throw new Error('Error al votar');
        }
    } catch (e) {
        showToast('No se pudo registrar el voto.', 'error');
    }
}

// ── Eliminar Tema ───────────────────────────────────────────────────────────
async function eliminarTema(id) {
    if (!confirm('¿Eliminar este tema?')) return;

    try {
        const res = await fetch(`/temas/${id}`, { method: 'DELETE' });
        if (res.ok) {
            showToast('Tema eliminado.', 'info');
            setTimeout(() => location.reload(), 600);
        } else {
            throw new Error('Error al eliminar');
        }
    } catch (e) {
        showToast('No se pudo eliminar el tema.', 'error');
    }
}

// ── Editar Tema ─────────────────────────────────────────────────────────────
function toggleEditarTema(id) {
    const display = document.getElementById(`tema-display-${id}`);
    const form = document.getElementById(`tema-form-${id}`);
    if (display && form) {
        display.classList.toggle('hidden');
        form.classList.toggle('hidden');
    }
}

async function guardarTema(id) {
    const input = document.getElementById(`tema-input-${id}`);
    const titulo = input.value.trim();
    if (!titulo) return;

    try {
        const res = await fetch(`/temas/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo })
        });
        if (res.ok) {
            showToast('Tema actualizado.', 'success');
            setTimeout(() => location.reload(), 600);
        } else {
            throw new Error('Error al actualizar');
        }
    } catch (e) {
        showToast('No se pudo actualizar el tema.', 'error');
    }
}

// ── Agregar Enlace (AJAX) ──────────────────────────────────────────────────
async function agregarEnlace(event, temaId) {
    event.preventDefault();
    const input = document.getElementById(`enlace-nuevo-${temaId}`);
    const url = input.value.trim();
    if (!url) return;

    try {
        const res = await fetch(`/temas/${temaId}/enlaces`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        if (res.ok) {
            showToast('Enlace agregado.', 'success');
            setTimeout(() => location.reload(), 600);
        } else {
            throw new Error('Error al agregar enlace');
        }
    } catch (e) {
        showToast('No se pudo agregar el enlace.', 'error');
    }
}

// ── Votar Enlace ────────────────────────────────────────────────────────────
async function votarEnlace(id) {
    try {
        const res = await fetch(`/enlaces/${id}/votar`, { method: 'PUT' });
        if (res.ok) {
            showToast('¡Voto de enlace registrado!', 'success');
            setTimeout(() => location.reload(), 600);
        } else {
            throw new Error('Error al votar enlace');
        }
    } catch (e) {
        showToast('No se pudo registrar el voto.', 'error');
    }
}

// ── Eliminar Enlace ─────────────────────────────────────────────────────────
async function eliminarEnlace(id) {
    if (!confirm('¿Eliminar este enlace?')) return;

    try {
        const res = await fetch(`/enlaces/${id}`, { method: 'DELETE' });
        if (res.ok) {
            showToast('Enlace eliminado.', 'info');
            setTimeout(() => location.reload(), 600);
        } else {
            throw new Error('Error al eliminar enlace');
        }
    } catch (e) {
        showToast('No se pudo eliminar el enlace.', 'error');
    }
}

// ── Editar Enlace ───────────────────────────────────────────────────────────
function toggleEditarEnlace(id) {
    const display = document.getElementById(`enlace-display-${id}`);
    const form = document.getElementById(`enlace-form-${id}`);
    if (display && form) {
        display.classList.toggle('hidden');
        form.classList.toggle('hidden');
    }
}

async function guardarEnlace(id) {
    const input = document.getElementById(`enlace-input-${id}`);
    const url = input.value.trim();
    if (!url) return;

    try {
        const res = await fetch(`/enlaces/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        if (res.ok) {
            showToast('Enlace actualizado.', 'success');
            setTimeout(() => location.reload(), 600);
        } else {
            throw new Error('Error al actualizar enlace');
        }
    } catch (e) {
        showToast('No se pudo actualizar el enlace.', 'error');
    }
}
