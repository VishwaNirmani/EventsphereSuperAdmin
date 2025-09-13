import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FaUserPlus, FaTrash } from "react-icons/fa";
import { addMemberViaEmail, getClubMembers, rejectMember, updateMemberRole } from "../services/ClubService";

const Members = () => {
  const { clubId } = useParams();
  const [searchParams] = useSearchParams();
  const clubName = searchParams.get("name");

  const [members, setMembers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [roleInput, setRoleInput] = useState("MEMBER");

  useEffect(() => {
    setIsLoading(true);
    getClubMembers("active").then(res => {
      setIsLoading(false);
      if (res.success) {
        console.log(res.data);
        setMembers(res.data);
      }
    });
  }, [clubId]);

  const handleRemove = (id) => {
    rejectMember(id).then(res => {
      if (res.success) {
        window.location.reload();
      }
    });
  };

  const handleRoleChange = (id, newRole) => {
    updateMemberRole(id, newRole).then(res => {
      if (res.success) {
        window.location.reload();
      }
    });
  };

  const handleAddMember = () => {
    setIsAdding(true);
    setError("");
    setMessage("");
    addMemberViaEmail(emailInput, roleInput).then(res => {
      setIsAdding(false);
      if (res.success) {
        setMessage("Member added successfully");
      }else{
        setError(res.message);
      }

      setTimeout(() => window.location.reload(), 2000);
    });
  }

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {clubName || "Club"} Members
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage members, roles, and invitations for this club
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center bg-custom-purple text-white px-4 py-2 rounded-lg shadow hover:bg-custom-purple-lock transition"
        >
          <FaUserPlus className="mr-2" /> Add Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded-lg text-center">
          <h3 className="text-gray-500 text-sm">Total Members</h3>
          <p className="text-xl font-bold text-gray-800">{members.length}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg text-center">
          <h3 className="text-gray-500 text-sm">Admins</h3>
          <p className="text-xl font-bold text-gray-800">
            {members.filter((m) => m.role === "ADMIN").length}
          </p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg text-center">
          <h3 className="text-gray-500 text-sm">Members</h3>
          <p className="text-xl font-bold text-gray-800">
            {members.filter((m) => m.role === "MEMBER").length}
          </p>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((member) => (
                <tr key={member.id} className="border-t">
                  <td className="px-4 py-3">{member.firstName} {member.lastName}</td>
                  <td className="px-4 py-3">{member.email}</td>
                  <td className="px-4 py-3">
                    <select
                      className="px-2 py-1 border rounded"
                      value={member.role}
                      onChange={(e) =>
                        handleRoleChange(member.id, e.target.value)
                      }
                    >
                      <option value={"MEMBER"}>Member</option>
                      <option value={"ADMIN"}>Admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleRemove(member.id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-4 py-6 text-center text-gray-500"
                  colSpan={4}
                >
                  No members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4">Add Member</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddMember();
              }}
            >
              <input
                type="email"
                placeholder="Email address"
                className="w-full mb-3 px-3 py-2 border rounded-md focus:ring focus:ring-custom-purple"
                required
                onChange={(e) => setEmailInput(e.target.value)}
                value={emailInput}
              />
              <select className="w-full mb-3 px-3 py-2 border rounded-md"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
              >
                <option value={"MEMBER"}>Member</option>
                <option value={"ADMIN"}>Admin</option>
              </select>
              <span className="text-red-600 font-bold text-sm">{error}</span>
              <span className="text-green-600 font-bold text-sm">{message}</span>
              <button
                type="submit"
                disabled={isAdding}
                className={`w-full ${isAdding ? "bg-custom-purple-lock" : "bg-custom-purple"} text-white py-2 rounded-md hover:bg-custom-purple-lock transition`}
              >
                {isAdding ? "Adding..." : "Add Member"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;