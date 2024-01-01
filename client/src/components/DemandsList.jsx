import React, { useState, useEffect } from "react";
import axios from "axios";
import Backend from "../../constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/userSlice";

const DemandsList = () => {
  const userData = useSelector(selectUserData);
  const navigate = useNavigate();

  const { id } = userData;
  const [demands, setDemands] = useState([]);

  useEffect(() => {
    if (id) {
      // Fetch demands for the specific user
      axios
        .get(`${Backend}/demands-by-user/${id}`)
        .then((response) => {
          setDemands(response.data);
        })
        .catch((error) => {
          console.error("Error fetching demands:", error);
          // Handle error, e.g., show an error message
        });
    }
  }, [id]); // Trigger the effect when the user ID changes

  const handleEdit = (demandId) => {
    // Navigate to the edit page or show a modal for editing
    navigate(`/edit-demand/${demandId}`);
  };

  const handleDelete = (demandId) => {
    // Add logic to delete the demand
    axios
      .delete(`${Backend}/delete-demand/${demandId}`)
      .then((response) => {
        // Handle successful deletion
        toast.success("Demand deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // Optionally, refetch demands after deletion
        // You can call the same API to get updated demands list
      })
      .catch((error) => {
        console.error("Error deleting demand:", error);
        // Handle error, e.g., show an error message
        toast.error("Error deleting demand!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Demands List for User {id}</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Service Type</th>
            <th className="py-2 px-4 border">Edit</th>
            <th className="py-2 px-4 border">Delete</th>
          </tr>
        </thead>
        <tbody>
          {demands.map((demand) => (
            <tr key={demand.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">{demand.description}</td>
              <td className="py-2 px-4 border">{demand.serviceType}</td>
              <td className="py-2 px-4 border">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleEdit(demand.id)}
                >
                  Edit
                </button>
              </td>
              <td className="py-2 px-4 border">
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(demand.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DemandsList;
