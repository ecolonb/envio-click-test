import swal from 'sweetalert';

export default function alertError(mensaje) {
    swal('Error', mensaje, 'error', {
        button: 'Ok'
    });
}