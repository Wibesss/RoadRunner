import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import AccountVozac from "./AccountVozac";
import AccountKompanija from "./AccountKompanija";
import AccountDispecer from "./AccountDispecer";
import { Navigate } from "react-router-dom";
const AccountPage = () => {
  const { ready, user } = useContext(UserContext);

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  
  return (
    <div className="">
      {user.role.toString() === "Vozac" ? (
        <AccountVozac />
      ) : user.role.toString() === "Kompanija" ? (
        <AccountKompanija />
      ) : (
        <AccountDispecer />
      )}
    </div>
  );
};

export default AccountPage;
