import style from "./passwordReset.module.css";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import Wave from "../../components/Wave/Wave";
import swal from "sweetalert";
import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";

export default function PasswordReset() {
  const { resetPwd } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
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
      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Email introuvable");
    }
  };

  return (
    <Layout pageTitle="Réinitialisation mot de passe">
      <Wave />
      <div className={style.passwordResetContainer}>
        <h1 className={style.title}>Réinitialisez votre mot de passe</h1>

        <div className={style.formContainer}>
          <form className={style.form} onSubmit={handleSubmit}>
            {error && <p>{error}</p>}

            <label className={style.label} htmlFor="passwordReset"></label>
            <input
              className={style.passwordResetInput}
              type="email"
              name="passwordReset"
              id="passwordReset"
              placeholder="Votre e-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className={style.btnReset} type="submit">
              Réinitialiser
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
