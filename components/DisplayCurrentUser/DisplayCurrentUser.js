import style from "../DisplayCurrentUser/DisplayCurrentUser.module.css";
import { useEffect } from "react";
import { getAllPractitionersData } from "../../model/PractitionersData/practitionersData";
import { useState } from "react";
import { useAuth } from "../../context/authContext";

const DisplayCurrentUser = () => {
  const { user } = useAuth();
  const [practitionersData, setPractitionersData] = useState("");

  useEffect(() => {
    getAllPractitionersData().then(setPractitionersData);
  }, []);
  return (
    <div className={style.displayCurrentUserContainer}>
      <p className={style.displayUser}>
        {practitionersData?.firstname} {practitionersData?.lastname}{" "}
        {user.displayName}
      </p>
    </div>
  );
};

export default DisplayCurrentUser;
