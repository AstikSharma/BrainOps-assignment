import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorOverlay, setShowErrorOverlay] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [requiredfields, setRequiredFields] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all required fields.");
      setRequiredFields(true);
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      try {
        const response = await axios.post("http://localhost:5000/signup", {
          email,
          password,
          image,
          name,
        });
        const responsemail = await axios.post("http://localhost:5000/send-email" , {
          email,
        });
        console.log(response.data);
        console.log(responsemail.data);
        const token = response.data.token;
        localStorage.setItem("cookie", token);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setName("");
        setImage("");
        setPasswordError("");
        setShowSuccessOverlay(true);
      } catch (error) {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setErrorMessage(error.response.data.error);
          setShowErrorOverlay(true);
        } else {
          setErrorMessage("Internal server error");
          setShowErrorOverlay(true);
        }
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleOkClick = () => {
    setErrorMessage("");
    setShowErrorOverlay(false);
    setShowSuccessOverlay(false);
    navigate("/");
  };
   const handleRegistered = () =>{
      navigate("/home");
   }
    
  const handleRequiredFields = () => {
    setErrorMessage("");
    setShowErrorOverlay(false);
    setRequiredFields(false);
  }

  return (
    <>
      <div className="relative">
        {showErrorOverlay && (
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
        )}
        {errorMessage && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-4 z-30 shadow-md rounded-md flex flex-col items-center">
            <p className="text-lg mb-4">{errorMessage}</p>
            <button
              onClick={handleOkClick}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 mt-4"
            >
              OK
            </button>
          </div>
        )}
        {showSuccessOverlay && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-4 z-30 shadow-md rounded-md flex flex-col items-center">
            <p className="text-lg mb-4">Registration successful!</p>
            <button
              onClick={handleRegistered}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 mt-4"
            >
              OK
            </button>
          </div>
        )}
        {requiredfields && (
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
        )}
        {requiredfields && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-4 z-30 shadow-md rounded-md flex flex-col items-center">
            <p className="text-lg mb-4">Please fill all the required fields</p>
            <button
              onClick={handleRequiredFields}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 mt-4"
            >
              OK
            </button>
          </div>
        )}
        <div className={`flex justify-center items-center min-h-screen ${showErrorOverlay || showSuccessOverlay ? 'blur-sm' : ''}`}>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-30 w-auto"
                src="https://s3.amazonaws.com/contents.newzenler.com/6034/courses/39920/data/thumb/s-3.jpg"
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address *
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={handleEmailChange}
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password *
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={handlePasswordChange}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password *
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {passwordError && (
                    <p className="text-sm text-red-600">{passwordError}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name (Optional)
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onChange={handleNameChange}
                      autoComplete="name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="profilePicture"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Profile Picture (Optional)
                  </label>
                  <div className="mt-2 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20 30l6 6 6-6M10 18h28"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="profilePicture"
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={termsChecked}
                    onChange={(e) => setTermsChecked(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I agree to the *{" "}
                    <a href="#" className="text-indigo-600">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
                <div>
                  <p  className="ml-2 block text-sm text-gray-900">Please wait upto 15 seconds after signing up to recieve confirmation email.</p>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!termsChecked} 
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Already a member?{" "}
                <a
                  href="/"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Log in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
