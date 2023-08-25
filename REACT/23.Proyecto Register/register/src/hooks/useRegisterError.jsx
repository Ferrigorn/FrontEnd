import Swal from 'sweetalert2'

export const useRegisterError = (res, setRegisterOk, setRes, setAllUser) => {
  //Para una respuesta ✔ ---> la info esta en el status
  if (res?.status == 200) {
    const dataToString = JSON.stringify(res);
    localStorage.setItem("data", dataToString);
    setRegisterOk(() => true);

    Swal.fire({
      icon: "success",
      title: "Welcome to my Page",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  // Respuesta 409: usuario ya registrado. en este caso la info estara en res.response.status

  if (res?.response?.status === 409) {
    Swal.fire({
      icon: "error",
      title: "Doh!",
      text: "Please, your email is incorrect.. try again!",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
  }

  // Para la contraseña con formato incorrecto

  if (res?.response?.data?.includes("validation failed: password")) {
    Swal.fire({
      icon: "error",
      title: "Doh!",
      text: "Min 8 characters, 1 upper case, 1 lower case and a special character",
      showConfirmButton: false,
      timer: 3000,
    });
    setRes({});
  }

  // Para usuario ya existente

  if (
    res?.response?.data?.includes(
      "duplicate key error collection: userProyect.users index: name_1 dup key: { name"
    )
  ) {
    Swal.fire({
        icon: "error",
        title: "Doh!",
        text: "Lo sentimos, Elige otro nombre",
        showConfirmButton: false,
        timer: 1500
    });
    setRes({});
  }

  // Para error del server (500)

  if (res?.response?.status == 500) {
    Swal.fire({
        icon: "error",
        title: "Doh!",
        text: "Interval server error. Please try again",
        showConfirmButton: false,
        timer: 1500,
    })
    setRes({});
  }

  // Para un error en el confirmationCode (404)

  if (res?.response?.status == 404 && res?.response?.data?.confirmationCode.includes("error, resend code")) {
    Swal.fire({
        icon: "error",
        title: "Doh!",
        text: "Register ok, error to resend code",
        showConfirmButton: false,
        timer: 1500,
    })
    setRes({});
  }
};
