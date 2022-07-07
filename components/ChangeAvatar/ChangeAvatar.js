import { useRef, useState } from "react";
import Avatar from "../Avatar/Avatar";
import style from "../ChangeAvatar/changeAvatar.module.css";
import { storage } from "../../config/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const ChangeAvatar = () => {
  const fileImputRef = useRef();
  const [image, setImage] = useState("");

  const handleAvatar = () => {
    fileImputRef.current.click();
  };

  const handleAvatarSelection = async () => {
    if (image == null) return;
    setImage(URL.createObjectURL(fileImputRef.current.files[0]));
    const imageRef = ref(storage, `avatars/${image.name + v4()}`);
    uploadBytes(imageRef, image);
  };

  return (
    <div className={style.avatarContainer}>
      <div className={style.aroundAvatar} onClick={handleAvatar}>
        <Avatar src={image} className={style.avatar} />
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
