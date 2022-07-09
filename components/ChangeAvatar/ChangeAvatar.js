import { useRef, useState, useEffect } from "react";
import Avatar from "../Avatar/Avatar";
import style from "../ChangeAvatar/changeAvatar.module.css";
import { useAuth } from "../../context/authContext";

const ChangeAvatar = () => {
  const { user, upload } = useAuth();

  const fileImputRef = useRef();
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://d29fhpw069ctt2.cloudfront.net/icon/image/84587/preview.svg"
  );

  const handleAvatarClick = () => {
    fileImputRef.current.click();
  };

  const handleAvatar = () => {
    upload(avatar, user, setLoading);
  };

  const handleAvatarSelection = async (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [user]);

  return (
    <div className={style.avatarContainer}>
      <div className={style.aroundAvatar} onClick={handleAvatarClick}>
        <Avatar src={photoURL} className={style.avatar} />
      </div>

      <form className={style.form}>
        <input
          id="avatar"
          accept="image/png, image/jpeg, image/jpg"
          type="file"
          ref={fileImputRef}
          onChange={handleAvatarSelection}
          style={{ display: "none" }}
        />
      </form>
      <button disabled={loading || !avatar} onClick={handleAvatar}>
        Sauvegardé
      </button>
    </div>
  );
};

export default ChangeAvatar;
