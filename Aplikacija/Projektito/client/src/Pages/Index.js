import React, { useState } from "react";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import IndexVozac from "./IndexVozac";

const options = ["Option 1", "Option 2", "Option 3"];
const Index = () => {
  const { ready, user } = useContext(UserContext);
};

export default Index;
