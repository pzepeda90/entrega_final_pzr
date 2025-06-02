import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

const CartNotificationService = {
  itemAdded: (item) => {
    Toast.fire({
      icon: 'success',
      title: '¡Producto agregado!',
      text: `${item.name} se agregó al carrito`,
      background: '#F0FDF4',
      iconColor: '#22C55E'
    });
  },

  itemRemoved: (item) => {
    Toast.fire({
      icon: 'info',
      title: 'Producto eliminado',
      text: `${item.name} se eliminó del carrito`,
      background: '#FEF2F2',
      iconColor: '#EF4444'
    });
  },

  itemUpdated: (item) => {
    Toast.fire({
      icon: 'info',
      title: 'Carrito actualizado',
      text: `Se actualizó la cantidad de ${item.name}`,
      background: '#F0F9FF',
      iconColor: '#3B82F6'
    });
  },

  error: (message) => {
    Toast.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      background: '#FEF2F2',
      iconColor: '#EF4444'
    });
  },

  cartCleared: () => {
    Toast.fire({
      icon: 'info',
      title: 'Carrito vacío',
      text: 'Se han eliminado todos los productos del carrito',
      background: '#F0F9FF',
      iconColor: '#3B82F6'
    });
  }
};

export default CartNotificationService; 