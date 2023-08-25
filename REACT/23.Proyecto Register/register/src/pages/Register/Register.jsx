import { useEffect, useState } from "react";
import { useRegisterError } from "../../hooks/useRegisterError";
import "./Register.css";
import { UploadFile } from "../../components/UploadFile/UploadFile";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { registerUser } from "../../services/user.service";

export const Register = () => {
  const { allUser, setAllUser, bridgeData } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okRegister, setOkRegister] = useState(false);

  // Funcion que se encarga del formulario y de la data del mismo
  const formSubmit = async (formData) => {
    const inputFile = document.getElementById("file-upload").files;

    if (inputFile.length !== 0) {
      //si el .length del input file no es 0, significa que hay una imagen(file)
      const customFormData = {
        ...formData,
        image: inputFile[0],
      };
      setSend(true); //cambiamos el state de false a true
      setRes(await registerUser(customFormData)); //modificamos la data proporcionada por el server
      setSend(false); // reinicializamos el state a false
    } else {
      //Si no han puesto imagen en el input
      const customFormData = {
        ...formData,
      };
      setSend(true);
      setRes(await registerUser(customFormData));
      setSend(false);
    }
  };

  // funcion que se encarga del formulario y gestionar los errores

  useEffect(() => {
    useRegisterError(res, setOkRegister, setRes, setAllUser);
    if (res?.status == 200) bridgeData("ALLUSER");
  }, [res]); //se ejecuta cada vez que res cambie

  // Estados de navegacion

  if (okRegister) {
    return <Navigate to="/verifyCode" />; //Si el registro es correcto nos redirige a
    //la pagina del CheckCode para verificarlo
  }

  return (
    <>
      <div className="form-wrap">
        <h1>Sign Up</h1>
        <p>It's free and only takes a minute</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register("name", { required: true })}
            />
            <label htmlFor="name" className="custom-placeholder">
              UserName
            </label>
          </div>
          <div className="password_container form-group">
            <input
              className="input_user"
              type="password"
              id="password"
              name="password"
              autoComplete="false"
              {...register("password", { required: true })}
            />
            <label htmlFor="password" className="custom-placeholder">
              Password
            </label>
          </div>

          <div className="email_container form-group">
            <input
              className="input_user"
              type="email"
              id="email"
              name="email"
              autoComplete="false"
              {...register("email", { required: true })}
            />
            <label htmlFor="email" className="custom-placeholder">
              email
            </label>

            <div className="sexo">
              <input
                type="radio"
                id="hombre"
                name="hombre"
                value="hombre"
                {...register("gender")}
              />
              <label htmlFor="hombre" className="label-radio hombre">
                Hombre
              </label>
              <input
                type="radio"
                id="mujer"
                name="sexo"
                value="mujer"
                {...register("gender")}
              />
              <label htmlFor="mujer" className="label-radio mujer">
                Mujer
              </label>
            </div>
            <UploadFile />
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? "#49c1a388" : "#2f7a67" }}
            >
              Register
            </button>
          </div>
          <p className="bottom-text">
            <small>
              By clicking the Sign Up button, you agree to our{" "}
              <Link className="anchorCustom">Terms & Conditions</Link> and{" "}
              <Link className="anchorCustom">Privacy Policy</Link>
            </small>
          </p>
        </form>
      </div>
      <div className="footerForm">
        <p className="parrafoLogin">
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </>
  );
};
