import { useRef, useState } from "react";
import Avatar from "../Avatar/Avatar";
import style from "../ChangeAvatar/changeAvatar.module.css";

const ChangeAvatar = () => {
  const fileImputRef = useRef();
  const [image, setImage] = useState("");

  const handleAvatar = () => {
    fileImputRef.current.click();
  };

  const handleAvatarSelection = () => {
    setImage(URL.createObjectURL(fileImputRef.current.files[0]));
  };

  return (
    <div className={style.avatarContainer}>
      <div className={style.aroundAvatar} onClick={handleAvatar}>
        <Avatar src={image} />
      </div>

      <form className={style.form}>
        <input
          id="avatar"
          accept="image/png, image/jpeg, image/gif"
          style={{ display: "none" }}
          type="file"
          ref={fileImputRef}
          onChange={handleAvatarSelection}
        />
      </form>
    </div>
  );
};

export default ChangeAvatar;
