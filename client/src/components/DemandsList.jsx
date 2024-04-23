import React, { useState, useEffect } from "react";
import axios from "axios";
import Backend from "../../constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/userSlice";
import Modal from "react-modal"; // Import react-modal
Modal.setAppElement("#root");
import ph from "../assets/black-bg.png";

const DemandsList = () => {
  const userData = useSelector(selectUserData);
  const navigate = useNavigate();

  const { id } = userData;
  const [demands, setDemands] = useState([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedDemand, setSelectedDemand] = useState({});
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedServiceType, setUpdatedServiceType] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`${Backend}/demands-by-user/${id}`)
        .then((response) => {
          setDemands(response.data);
        })
        .catch((error) => {
          console.error("Error fetching demands:", error);
        });
    }
  }, [id]);

  const handleEdit = (demand) => {
    // Set the selected demand and open the edit modal
    setSelectedDemand(demand);
    setUpdatedDescription(demand.description);
    setUpdatedServiceType(demand.serviceType);
    setEditModalIsOpen(true);
  };

  const handleUpdate = () => {
    // Update the demand using the API
    axios
      .put(`${Backend}/update-demand/${selectedDemand.id}`, {
        description: updatedDescription,
        serviceType: updatedServiceType,
      })
      .then((response) => {
        toast.success("Demand updated successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // Optionally, refetch demands after update
        // You can call the same API to get updated demands list
        setDemands((prevDemands) =>
          prevDemands.map((demand) =>
            demand.id === selectedDemand.id ? response.data : demand
          )
        );
        setEditModalIsOpen(false);
      })
      .catch((error) => {
        console.error("Error updating demand:", error);
        // Handle error, e.g., show an error message
        toast.error("Error updating demand!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setEditModalIsOpen(false);
      });
  };

  const handleDelete = (demandId) => {
    // Add logic to delete the demand
    axios
      .delete(`${Backend}/delete-demand/${demandId}`)
      .then((response) => {
        toast.success("Demand deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setDemands((prevDemands) =>
          prevDemands.filter((demand) => demand.id !== demandId)
        );
      })
      .catch((error) => {
        console.error("Error deleting demand:", error);
        toast.error("Error deleting demand!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white"
      style={{
        backgroundImage: `url(${ph})`,
        backgroundSize: "cover",
        backgroundPosition: "center",

        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        opacity: 0.9,
      }}
    >
      {" "}
      <h2 className="text-2xl font-bold mb-4">Demands List for User {id}</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border text-black hover:border-black">
              Description
            </th>
            <th className="py-2 px-4 border text-black hover:border-black">
              Service Type
            </th>
            <th className="py-2 px-4 border text-black hover:border-black">
              Edit
            </th>
            <th className="py-2 px-4 border text-black hover:border-black">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {demands.map((demand) => (
            <tr
              key={demand.id}
              className="hover:bg-gray-50  hover:text-black  hover:border-black"
            >
              <td className="py-2 px-4 border hover:text-black  hover:border-black">
                {demand.description}
              </td>
              <td className="py-2 px-4 border hover:border-black">
                {demand.servicetype}
              </td>
              <td className="py-2 px-4 border hover:border-black">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleEdit(demand)}
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
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
      >
        <h2>Edit Demand</h2>
        <label>Description:</label>
        <input
          type="text"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
        <label>Service Type:</label>
        <input
          type="text"
          value={updatedServiceType}
          onChange={(e) => setUpdatedServiceType(e.target.value)}
        />
        <button onClick={handleUpdate}>Update</button>
        <button onClick={() => setEditModalIsOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
};

export default DemandsList;
