import style from "../Avatar/avatar.module.css";
import { useAuth } from "../../context/authContext";

export default function Avatar({ alt, src }) {
  const { user } = useAuth();

  return (
    <>
      {/* eslint-disable-next-line */}
      <img
        data-cy="currentUserAvatar"
        src={src || user.photoURL}
        alt={alt}
        className={style.avatar}
      />{" "}
    </>
  );
}
