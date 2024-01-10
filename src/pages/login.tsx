import axios from "axios";
import Link from "next/link";
import { useState } from "react";

/* eslint-disable @next/next/no-img-element */
const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://139.59.76.189:4000/auth/login",
        formData
      );

      if (response.status === 200) {
        // Handle successful signup
        console.log(formData);
        localStorage.setItem("token", response.data.token);

        console.log("Login successful");
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
            <h1 className="text-4xl font-bold text-dark">Welcome back!</h1>
            <h3 className="mt-4 text-xl font-medium text-light">
              Get ready to venture
            </h3>
            <form className="mt-8" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="rounded-xl p-4 border border-light border-opacity-60 w-full focus:outline-green"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="mt-4 rounded-xl p-4 border border-light border-opacity-60 w-full focus:outline-green"
              />
              <button className="mt-8 text-white font-semibold rounded-xl text-lg p-5 w-full bg-green">
                Login
              </button>
            </form>
            <p className="text-center mt-6 text-lg font-medium">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        <div
          className="w-full h-full bg-cover rounded-l-xl bg-center"
          style={{ backgroundImage: "url(img/loginImg.jpg)" }}
        ></div>
      </div>
    </main>
  );
};

export default Login;
