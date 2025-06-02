import Swal from 'sweetalert2';

const AlertService = {
  // Alerta de éxito
  success: (title, message = '') => {
    return Swal.fire({
      title,
      text: message,
      icon: 'success',
      customClass: {
        container: 'font-sans',
        popup: 'rounded-lg',
        confirmButton: 'bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200'
      },
      buttonsStyling: false
    });
  },

  // Alerta de error
  error: (title, message = '') => {
    return Swal.fire({
      title,
      text: message,
      icon: 'error',
      customClass: {
        container: 'font-sans',
        popup: 'rounded-lg',
        confirmButton: 'bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200'
      },
      buttonsStyling: false
    });
  },

  // Alerta de confirmación
  confirm: (title, message = '') => {
    return Swal.fire({
      title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      customClass: {
        container: 'font-sans',
        popup: 'rounded-lg',
        confirmButton: 'bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 mr-2',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-lg transition-colors duration-200'
      },
      buttonsStyling: false
    });
  },

  // Alerta de carga
  loading: (title = 'Procesando...') => {
    return Swal.fire({
      title,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      customClass: {
        container: 'font-sans',
        popup: 'rounded-lg'
      }
    });
  },

  // Cerrar alerta actual
  close: () => {
    Swal.close();
  }
};

export default AlertService; 