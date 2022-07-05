import style from "./DesktopMenu.module.css";
import { Avatar } from "@mui/material";

export default function DesktopMenu() {
  return (
    <div className={style.bg}>
      <Avatar
        className={style.user}
        alt="votre photo"
        sx={{ width: 100, height: 100 }}
      />

      <ul>
        <li>Tableau de bord</li>
        <li>Clients</li>
        <li>Séances</li>
        <li>Profil</li>
      </ul>
    </div>
  );
}
