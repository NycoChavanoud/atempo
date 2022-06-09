import style from "./passwordReset.module.css";
import { useState } from "react";
import { useAuth } from "../../context/authContext";

export default function PasswordReset() {
  const { resetPwd } = useAuth();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await resetPwd(email);
      setMessage(
        "Un mail pour réinitialiser votre mot de passe vous a été envoyé"
      );
    } catch (error) {
      console.log(error);
      setError("Email introuvable");
    }
  };

  // const ResetPassword = async (e) => {
  //   e.preventDefault();

  //   await sendPasswordResetEmail(auth, email)
  //     .then(() => {
  //       setMessage(
  //         "Un mail pour réinitialiser votre mot de passe vous a été envoyé"
  //       );
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setError("Email introuvable");
  //     });
  // };

  return (
    <>
      <div className={style.passwordResetContainer}>
        <h1 className={style.title}>Modifier votre mot de passe</h1>

        <div className={style.formContainer}>
          <form className={style.form} onSubmit={handleSubmit}>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}

            <label className={style.label} htmlFor="passwordReset">
              Réinitialisé votre mot de passe
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
