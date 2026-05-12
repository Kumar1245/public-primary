"use client";

import Swal from "sweetalert2";

const SweetAlert = {
    success: (title = "Success!", text = "Operation completed successfully.") => {
        return Swal.fire({
            title,
            text,
            icon: "success",
            confirmButtonText: "OK",
            background: "#fff",   // Tailwind slate-800 style
            color: "#0042a4",           // text color
            confirmButtonColor: "#0042a4", // Tailwind blue-500
            customClass: {
                popup: "my-spin-wheel",
                icon: "my-custom-icon", // override icon class
            },
        });
    },

    error: (title = "Error!", text = "Something went wrong!") => {
        return Swal.fire({
            title,
            text,
            icon: "error",
            confirmButtonText: "OK",
        });
    },

    warning: (title = "Warning!", text = "Are you sure?") => {
        return Swal.fire({
            title,
            text,
            icon: "warning",
            confirmButtonText: "OK",
        });
    },

    confirm: async (
        title = "Are you sure?",
        text = "You won’t be able to revert this!"
    ) => {
        const result = await Swal.fire({
            title,
            text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        });
        return result.isConfirmed;
    },
};

export default SweetAlert;
