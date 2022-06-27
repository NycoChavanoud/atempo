import style from "../Avatar/avatar.module.css";

export default function Avatar({ src, alt }) {
  return (
    <>
      {/* eslint-disable-next-line */}
      <img
        data-cy="currentUserAvatar"
        width={110}
        height={110}
        src={
          src ||
          "https://d29fhpw069ctt2.cloudfront.net/icon/image/84587/preview.svg"
        }
        alt={alt}
        className={style.avatar}
      />{" "}
    </>
  );
}