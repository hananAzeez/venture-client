import axios from "axios";
import Link from "next/link";
import { useState } from "react";

/* eslint-disable @next/next/no-img-element */
const Signup = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://139.59.76.189:4000/auth/register",
        formData
      );

      if (response.status === 200) {
        // Handle successful signup
        console.log("Signup successful");
      } else {
        // Handle signup failure
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <main>
      <div className="grid lg:grid-cols-2 h-screen overflow-hidden">
        <div className="h-full w-full flex items-center justify-center px-5 lg:px-0">
          <div className="flex flex-col lg:w-2/3 xl:w-3/5 mx-auto">
            <h1 className="text-4xl font-bold text-dark">Get Started Now</h1>
            {/* <h3 className="mt-4 text-xl font-medium text-light">
              Get ready to venture
            </h3> */}
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  className="rounded-xl p-4 border border-light border-opacity-60 w-full focus:outline-green"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  className="rounded-xl p-4 border border-light border-opacity-60 w-full focus:outline-green"
                />
              </div>
              <input
                type="email"
                placeholder="Email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-4 rounded-xl p-4 border border-light border-opacity-60 w-full focus:outline-green"
              />
              <input
                type="text"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-4 rounded-xl p-4 border border-light border-opacity-60 w-full focus:outline-green"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-4 rounded-xl p-4 border border-light border-opacity-60 w-full focus:outline-green"
              />
              <button className="mt-8 text-white font-semibold rounded-xl text-lg p-5 w-full bg-green">
                Signup
              </button>
            </form>
            <p className="text-center mt-6 text-lg font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
        <div
          className="w-full h-full bg-cover rounded-l-xl bg-center"
          style={{ backgroundImage: "url(img/signUpImg.jpg)" }}
        />
      </div>
    </main>
  );
};

export default Signup;
