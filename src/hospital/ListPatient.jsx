import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Trash2 } from "lucide-react";
import API from "@/axios/axios.js";

export default function PatientsListPage() {
  const [patients, setPatients] = useState([]);
  const { user } = useContext(Context);

  const fetchPatients = async () => {
    try {
      const { data } = await API.get("/api/v1/patients", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPatients(data.patients);
    } catch (error) {
      toast.error("Erreur lors du chargement des patients");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression du patient ?")) return;

    try {
      await API.delete(`/api/v1/patients/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Patient supprimé");
      fetchPatients();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Dossiers Patients</h1>
      {patients.length === 0 ? (
        <p className="text-gray-500">Aucun patient trouvé.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4">Nom complet</th>
                <th className="py-2 px-4">Date de naissance</th>
                <th className="py-2 px-4">Genre</th>
                <th className="py-2 px-4">Groupe sanguin</th>
                <th className="py-2 px-4">Téléphone</th>
                <th className="py-2 px-4">Responsable</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{p.fullName}</td>
                  <td className="py-2 px-4">{new Date(p.dateOfBirth).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{p.gender}</td>
                  <td className="py-2 px-4">{p.bloodGroup}</td>
                  <td className="py-2 px-4">{p.contact?.phone || "—"}</td>
                  <td className="py-2 px-4">{p.responsable?.name || "—"}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
