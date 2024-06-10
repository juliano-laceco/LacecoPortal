import { toast, Slide } from 'react-toastify';

export function showToast(type, message , autoClose = 7000) {

    const params = {
        position: "top-right",
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
    };

    type === "success" ? toast.success(message, params) : toast.error(message, params)
}