import style from "../DisplayCurrentUser/DisplayCurrentUser.module.css";
import { auth } from "../../config/firebaseConfig";
import { useEffect } from "react";
import { getAllPractitionersData } from "../../model/PractitionersData/practitionersData";
import { useState } from "react";

const DisplayCurrentUser = () => {
  const user = auth.currentUser;
  const [practitionersData, setPractitionersData] = useState();

  useEffect(() => {
    getAllPractitionersData().then(setPractitionersData);
    console.log(practitionersData);
  }, []);
  return (
    <div className={style.displayCurrentUserContainer}>
      <p className={style.displayUser}>
        {user
          ? user?.auth?.currentUser?.displayName
          : practitionersData?.firstname + practitionersData?.lastname}
      </p>
    </div>
  );
};

export default DisplayCurrentUser;
