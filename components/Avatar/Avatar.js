import style from "../Avatar/avatar.module.css";
import { useAuth } from "../../context/authContext";

export default function Avatar({ alt, src }) {
  const { user } = useAuth();

  return (
    <>
      {/* eslint-disable-next-line */}
      <img
        data-cy="currentUserAvatar"
        src={
          src ||
          user.photoURL ||
          "https://d29fhpw069ctt2.cloudfront.net/icon/image/84587/preview.svg"
        }
        alt={alt}
        className={style.avatar}
      />{" "}
    </>
  );
}
