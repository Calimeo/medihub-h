import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdMedicalServices,
  MdPeople,
  MdHotel,
  MdAssignment,
  MdLogout,
  MdInventory,
  MdPointOfSale,
} from "react-icons/md";
import { FaUserNurse } from "react-icons/fa";
import { BsCapsulePill } from "react-icons/bs";
import { Context } from "../main";
import { toast } from "react-toastify";
import API from "@/axios/axios.js";

const links = [
  {
    to: "/hospital/dashboard",
    label: "Tableau de bord",
    icon: <MdDashboard className="text-3xl text-teal-600" />,
  },
  {
    to: "/hospital/services",
    label: "Services",
    icon: <MdMedicalServices className="text-3xl text-indigo-600" />,
  },
  {
    to: "/hospital/doctors",
    label: "Médecins",
    icon: <MdPeople className="text-3xl text-blue-600" />,
  },
  {
    to: "/hospital/beds",
    label: "Lits & Chambres",
    icon: <MdHotel className="text-3xl text-amber-600" />,
  },
  {
    to: "/hospital/admissions",
    label: "Admissions / Sorties",
    icon: <MdAssignment className="text-3xl text-fuchsia-600" />,
  },
  {
    to: "/hospital/inventory",
    label: "Stocks & Fournitures",
    icon: <MdInventory className="text-3xl text-rose-600" />,
  },
  {
    to: "/hospital/nurse",
    label: "Infirmières",
    icon: <FaUserNurse className="text-3xl text-lime-600" />,
  },
  {
    to: "/pharmacy",
    label: "Pharmacie",
    icon: <BsCapsulePill className="text-3xl text-violet-600" />,
  },
  {
    to: "/accounting",
    label: "Comptabilité",
    icon: <MdPointOfSale className="text-3xl text-emerald-600" />,
  },
  {
    to: "/add/patient",
    label: "ajouter un patient",
    icon: <MdPointOfSale className="text-3xl text-emerald-600" />,
  },
  {
    to: "/list/patient",
    label: "Liste des patient",
    icon: <MdPointOfSale className="text-3xl text-emerald-600" />,
  },
];

const Home = () => {
  const { hospital, setHospital } = useContext(Context);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await API.get("/api/v1/user/hospital/logout", { withCredentials: true });
      setHospital(null);
      localStorage.removeItem("hospitalToken");
      toast.success("Déconnexion réussie.");
      navigate("/login");
    } catch (error) {
      toast.error("Erreur lors de la déconnexion.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Bienvenue {hospital?.directeur ? `à ${hospital.directeur}` : "à votre Hôpital"}
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Accédez rapidement à toutes les fonctionnalités de gestion.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {links.map(({ to, label, icon }, index) => (
          <Link
            key={index}
            to={to}
            className="bg-white hover:bg-teal-50 border border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-lg transition duration-300"
          >
            {icon}
            <span className="mt-4 text-gray-800 font-medium text-sm text-center">
              {label}
            </span>
          </Link>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={logoutHandler}
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-xl shadow-lg transition duration-300"
        >
          <MdLogout className="text-xl" />
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Home;
