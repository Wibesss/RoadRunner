import React from "react";

const AccountKompanija = () => {
  const { user } = useContext(UserContext);

  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profil";
  }

  const linkClasses = (type = null) => {
    let classes = "p-2 px-6 text-xl hover:text-primary duration-300";
    if (type === subpage) {
      classes = "p-2 px-6 text-xl bg-primary text-white rounded-full";
    }
    return classes;
  };

  return (
    <div className="flex flex-col items-center font-bold">
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
        <Link className={linkClasses("profil")} to={"/account"}>
          Profil
        </Link>

        <Link
          className={linkClasses("favorizovani")}
          to={"/account/favorizovani"}
        >
          Fovorizovani Vozaci
        </Link>
      </nav>
      {subpage === "profil" && <KompanijaProfil />}
      {subpage === "favorizovani" && <KompanijaFavorizovani />}
    </div>
  );
};

export default AccountKompanija;
