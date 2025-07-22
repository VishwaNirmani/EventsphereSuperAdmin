import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../services/AuthService";


const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [keycode, setKeycode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handlebtnSignup = async (e) => {
    
    e.preventDefault();
    
    if (!validateFields()) {
      return;
    }
    
    setIsLoading(true);

    const res = await register(
      firstName,
      lastName,
      email,
      password,
      keycode
    );
    setIsLoading(false);

    if (res.success) {
      navigate("/login");
    } else {
      setErrorMessage(res.message);
    }

  };

  const validateFields = () => {

    if (firstName === "") {
      setErrorMessage("First name cannot be empty");
      return false;
    }

    if (lastName === "") {
      setErrorMessage("Last name cannot be empty");
      return false;
    }

    if (email === "") {
      setErrorMessage("Email cannot be empty");
      return false;
    }

    if (password === "" || confirmPassword == "") {
      setErrorMessage("Password cannot be empty");
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords are not matching");
      return false;
    }

    return true;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Header */}
      <div className="text-center mb-8 mt-4">
        <h1 className="text-4xl font-extrabold text-custom-purple tracking-tight">
          EventSphere
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Create your account to book and manage amazing events
        </p>
      </div>

      {/* Register Card */}
      <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Super Admin Account</h2>


        <form className="space-y-5">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <label htmlFor="name" className="block mb-1 text-gray-600">First Name</label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-purple"
                placeholder="John"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="flex-1 mt-4 md:mt-0">
              <label htmlFor="name" className="block mb-1 text-gray-600">Last Name</label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-purple"
                placeholder="Doe"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>


          <div>
            <label htmlFor="email" className="block mb-1 text-gray-600">Username</label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-purple"
              placeholder="you@example.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-purple"
              placeholder="••••••••"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block mb-1 text-gray-600">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-purple"
              placeholder="••••••••"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="keycode" className="block mb-1 text-gray-600">KeyCode</label>
            <input
              type="password"
              id="keycode"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-purple"
              placeholder="••••••••"
              value={keycode}
              required
              onChange={(e) => setKeycode(e.target.value)}
            />
          </div>


          <button
            type="submit"
            className={"w-full bg-custom-purple text-white font-semibold py-2 rounded-lg hover:bg-custom-purple transition"}
            onClick={handlebtnSignup}
          >
            {isLoading ? "Signing up..." : "Sign Up"}

          </button>
          <div className="flex mt-2 text-sm text-custom-purple w-full justify-between">
            <span className="text-sm text-red-700">{errorMessage}</span>
          </div>

        </form>

        <p className="mt-4 text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-custom-purple hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );

};


export default Register;