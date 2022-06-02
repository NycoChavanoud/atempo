import style from "./inscription.module.css";

export default function Inscription() {
  return (
    <>
      <div className={style.inscriptionContainer}>
        <h1 className={style.title}>Inscription</h1>

        <div className={style.formContainer}>
          <form className={style.form}>
            <label className={style.label} htmlFor="Prenom-nom">
              Prénom - Nom
            </label>
            <input
              className={style.nameInput}
              type="text"
              name=""
              id="Prenom-nom"
            />

            <label className={style.label} htmlFor="email">
              E-mail
            </label>
            <input
              className={style.emailInput}
              type="email"
              name=""
              id="email"
            />

            <label className={style.label} htmlFor="pwd">
              Mot de passe
            </label>
            <input
              className={style.pwdInput}
              type="password"
              name=""
              id="pwd"
            />

            <label className={style.label} htmlFor="pwdConfirmation">
              Confirmation
            </label>
            <input
              className={style.pwdConfirmationInput}
              type="password"
              name=""
              id="pwdConfirmation"
            />
            <button className={style.btnInscription} type="submit">
              Inscription
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
