import style from "../DisplayCurrentUser/DisplayCurrentUser.module.css";
import { useEffect } from "react";
import { getAllPractitionersData } from "../../model/PractitionersData/practitionersData";
import { useState } from "react";
import { useAuth } from "../../context/authContext";

const DisplayCurrentUser = () => {
  const [practitionersData, setPractitionersData] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    getAllPractitionersData(user).then(setPractitionersData);
  }, []);
  return (
    <div className={style.displayCurrentUserContainer}>
      <p className={style.displayUser}>
        {practitionersData?.firstname} {practitionersData?.lastname}{" "}
      </p>
    </div>
  );
};

export default DisplayCurrentUser;
