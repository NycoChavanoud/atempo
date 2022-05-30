import Link from "next/link";
import style from "./Nav.module.css";

export default function NavBar() {
  return (
    <header className={style.header}>
      <nav className={style.link}>
        <Link href="/">
          <a>Accueil</a>
        </Link>
        <Link href="/dashboard">
          <a>Tableau de bord</a>
        </Link>
        <Link href="/clients">
          <a>Clients</a>
        </Link>
        <Link href="/sessions">
          <a>Séances</a>
        </Link>
        <Link href="/profile">
          <a>Profil</a>
        </Link>
      </nav>
    </header>
  );
}
