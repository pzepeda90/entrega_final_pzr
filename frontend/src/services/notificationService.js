import Swal from 'sweetalert2';

// Configuración base para todas las notificaciones
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

// Notificación de éxito
export const showSuccess = (message) => {
  Swal.fire({
    icon: 'success',
    title: '¡Éxito!',
    text: message,
    timer: 2000,
    showConfirmButton: false,
  });
};

// Notificación de error
export const showError = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
  });
};

// Notificación de advertencia
export const showWarning = (message) => {
  Toast.fire({
    icon: 'warning',
    title: message,
  });
};

// Notificación de información
export const showInfo = (message) => {
  Toast.fire({
    icon: 'info',
    title: message,
  });
};

// Diálogo de confirmación
export const showConfirm = async ({
  title = '¿Estás seguro?',
  text = 'Esta acción no se puede deshacer',
  icon = 'warning',
  confirmButtonText = 'Sí, continuar',
  cancelButtonText = 'Cancelar',
}) => {
  const result = await Swal.fire({
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
  });

  return result.isConfirmed;
};

// Modal de formulario personalizado
export const showForm = async ({
  title,
  html,
  confirmButtonText = 'Guardar',
  preConfirm = () => true,
}) => {
  const result = await Swal.fire({
    title,
    html,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: 'Cancelar',
    preConfirm,
  });

  return result;
};

export const showLoading = (message = 'Cargando...') => {
  Swal.fire({
    title: message,
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeLoading = () => {
  Swal.close();
}; 