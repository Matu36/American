import { useMutation } from "@tanstack/react-query";
import { MailsMasivosAPI } from "../components/api/MailsMasivosApi";
import Swal from "sweetalert2";

const postMails = async (data) => {
  return await MailsMasivosAPI.post(`create`, data);
};

export const useMails = () => {
  const mailsMutation = useMutation({
    mutationFn: postMails,
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Los emails se enviaron corréctamente",
        showConfirmButton: false,
        timer: 2000,
        background: "#ffffff",
        iconColor: "#ffc107",
        customClass: {
          title: "text-dark",
        },
      });
    },
    onError: (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            Swal.fire({
              position: "center",
              icon: "warning",
              title:
                "No pudieron enviarse los Emails por favor, intente nuevamente",
              background: "#ffffff",
              iconColor: "#ffc107",
              customClass: {
                title: "text-dark",
              },
              showConfirmButton: false,
              timer: 5000,
            });
            break;
          default:
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Hubo un error",
              showConfirmButton: false,
              timer: 2000,
              background: "#ffffff",
              iconColor: "#ffc107",
              customClass: {
                title: "text-dark",
              },
            });
            break;
        }
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Hubo un error al procesar la solicitud",
          showConfirmButton: false,
          timer: 2000,
          background: "#ffffff",
          iconColor: "#ffc107",
          customClass: {
            title: "text-dark",
          },
        });
      }
    },
  });

  return {
    mailsMutation,
  };
};
