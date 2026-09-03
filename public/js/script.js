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

// ── Votar ────────────────────────────────────────────────────────────────────
async function votarTema(id, btn) {
    btn.disabled = true;
    btn.classList.add('opacity-50', 'cursor-not-allowed');

    try {
        const res = await fetch(`/temas/${id}/votar`, { method: 'POST' });

        if (res.ok) {
            // Animación de pulso en el item padre
            const item = btn.closest('li');
            if (item) {
                item.classList.add('animate-pulse-once');
                item.addEventListener('animationend', () => item.classList.remove('animate-pulse-once'), { once: true });
            }
            showToast('¡Voto registrado! 🎉', 'success');
            setTimeout(() => location.reload(), 600);
        } else {
            throw new Error('Error al votar');
        }
    } catch (e) {
        showToast('No se pudo registrar el voto.', 'error');
        btn.disabled = false;
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// ── Eliminar ─────────────────────────────────────────────────────────────────
async function eliminarTema(id, btn) {
    const item = btn.closest('li');

    // Confirmar con un toast visual (simple confirm nativo como fallback)
    if (!confirm('¿Eliminar este tema?')) return;

    btn.disabled = true;

    try {
        const res = await fetch(`/temas/${id}`, { method: 'DELETE' });

        if (res.ok) {
            // Animar salida del item
            if (item) {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity    = '0';
                item.style.transform  = 'translateX(30px)';
                item.style.maxHeight  = item.offsetHeight + 'px';
                setTimeout(() => {
                    item.style.maxHeight = '0';
                    item.style.padding   = '0';
                    item.style.margin    = '0';
                    item.style.overflow  = 'hidden';
                }, 300);
                setTimeout(() => {
                    item.remove();
                    // Actualizar contador si queda vacía la lista
                    const lista = document.querySelector('ul');
                    if (lista && lista.children.length === 0) location.reload();
                }, 600);
            }
            showToast('Tema eliminado.', 'info');
        } else {
            throw new Error('Error al eliminar');
        }
    } catch (e) {
        showToast('No se pudo eliminar el tema.', 'error');
        btn.disabled = false;
    }
}
