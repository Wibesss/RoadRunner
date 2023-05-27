import React from "react";
import VozacPonudjene from "./VozacPonudjene";
import VozacPrihvacene from "./VozacPrihvacene";
const IndexVozac = () => {
  return (
    <div className="flex flex-row flex-wrap wrap">
      <div className="">
        <VozacPonudjene />
      </div>
      <div className="">
        <VozacPrihvacene />
      </div>
    </div>
  );
};

export default IndexVozac;
