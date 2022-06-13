import style from "./passwordReset.module.css";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import Wave from "../../components/Wave/Wave";
import swal from "sweetalert";

export default function PasswordReset() {
  const { resetPwd } = useAuth();

  const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await resetPwd(email);
      swal(
        "E-mail envoyé",
        "Un mail de réinitialisation de votre mot de passe vous a été envoyé, vérifiez vos SPAM ",
        "success"
      );
    } catch (error) {
      console.log(error);
      setError("Email introuvable");
    }
  };

  return (
    <>
      <Wave />
      <div className={style.passwordResetContainer}>
        <h1 className={style.title}>Modifier votre mot de passe</h1>

        <div className={style.formContainer}>
          <form className={style.form} onSubmit={handleSubmit}>
            {/* {message && <p>{message}</p>} */}
            {error && <p>{error}</p>}

            <label className={style.label} htmlFor="passwordReset">
              Réinitialisez votre mot de passe
            </label>
            <input
              className={style.passwordResetInput}
              type="email"
              name="passwordReset"
              id="passwordReset"
              placeholder="Votre e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className={style.btnReset} type="submit">
              Réinitialiser
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
