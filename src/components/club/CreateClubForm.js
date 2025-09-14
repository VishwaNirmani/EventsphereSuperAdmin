import { useState } from "react";
import { motion } from "framer-motion";
import { FiUpload } from "react-icons/fi";
import { createClub } from "../../services/ClubService";

const CreateClubForm = ({ onClose, fireReload }) => {
  const [formData, setFormData] = useState({
    name: "",
    heading: "",
    description: "",
    logo: null,
    isPublic: true,
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, logo: file });
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateFields()){
      console.log("not validated!");
      return;
    }

    setIsPosting(true);
    const dataToPost = new FormData();
    dataToPost.append("name", formData.name);
    dataToPost.append("description", formData.description);
    dataToPost.append("heading", formData.heading);
    dataToPost.append("public", formData.isPublic);
    dataToPost.append("logo", formData.logo);

    const res = await createClub(dataToPost);
    setIsPosting(false);
    if(res.success){
        onClose();
        fireReload();
    }else{
        setErrorMessage(res.message);
    }
  };

  const validateFields = () => {
    if(!formData.name){
      setErrorMessage("Name is required!");
      return false;
    }
    if(!formData.heading){
      setErrorMessage("Heading is required!");
      return false;
    }
    if(formData.logo == null){
      setErrorMessage("Logo is required!");
      return false;
    }
    if(!formData.description){
      setErrorMessage("A description is required!");
      return false;
    }

    return true;
  }

  return (
    <div className="w-full sm:w-[90vw] max-w-3xl bg-white rounded-2xl shadow-xl p-4 sm:p-8 overflow-y-auto max-h-[90vh] mx-auto my-8">
      {/* Close Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-black text-xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-black mb-6 text-center">Create a New Club</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Club Name <span className="text-red-700">*</span></label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-custom-purple"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heading <span className="text-red-700">*</span></label>
            <input
              type="text"
              value={formData.heading}
              onChange={(e) => handleChange("heading", e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-custom-purple"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-700">*</span></label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows="4"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-custom-purple"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Club Logo <span className="text-red-700">*</span></label>
            <div className="flex items-center gap-4">
              <label className="flex items-center cursor-pointer text-custom-purple hover:text-custom-purple-lock transition">
                <FiUpload className="mr-2" />
                <span>Upload Logo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </label>
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="w-16 h-16 object-cover rounded-xl border"
                />
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              checked={formData.isPublic}
              onChange={(e) => handleChange("isPublic", e.target.checked)}
              className="w-5 h-5 text-custom-purple border-gray-300 focus:ring-custom-purple"
            />
            <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
              Make this club public
            </label>
          </div>

          <div className="text-red-600">
            <span>{errorMessage}</span>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className={`hover:bg-custom-purple-lock text-white px-8 py-2 rounded-full font-semibold transition ${isPosting ? 'bg-custom-purple-lock' : 'bg-custom-purple'}`}
            >
              {isPosting ? "Creating Club.." : "Create Club"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateClubForm;