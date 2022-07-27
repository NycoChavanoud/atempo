import style from "../Avatar/avatar.module.css";
import { CircularProgress } from "@mui/material";

export default function Avatar({
  alt = "avatar picture",
  src,
  loading = false,
}) {
  return (
    <>
      {/* eslint-disable-next-line */}
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          data-cy="currentUserAvatar"
          src={src}
          alt={alt}
          className={style.avatar}
        />
      )}
    </>
  );
}
