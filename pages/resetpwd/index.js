import style from "./passwordReset.module.css";
import React, { useState } from "react";
import { auth } from "../../config/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const ResetPassword = async (e) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage(
          "Merci de regarder dans votre boite mail pour réinitialiser votre mot de passe"
        );
      })
      .catch((error) => {
        console.log(error);
        setError("Email introuvable");
      });
  };

  return (
    <>
      <div className={style.passwordResetContainer}>
        <h1 className={style.title}>Modifier votre mot de passe</h1>

        <div className={style.formContainer}>
          <form className={style.form}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className={style.btnReset}
              type="submit"
              onClick={ResetPassword}
            ></button>
          </form>
        </div>
      </div>
    </>
  );
}
