import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { useState } from "react";

/* eslint-disable @next/next/no-img-element */
const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://139.59.76.189:4000/auth/login",
        formData
      );

      if (response.status === 200) {
        // Handle successful signup
        localStorage.setItem("token", response.data.token);
        redirect("/");

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
          <div
            className="absolute top-10 left-10 cursor-pointer"
            onClick={() => router.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M27.9998 16C27.9998 16.2652 27.8945 16.5196 27.7069 16.7071C27.5194 16.8947 27.265 17 26.9998 17H7.41356L14.7073 24.2925C14.8002 24.3854 14.8739 24.4957 14.9242 24.6171C14.9745 24.7385 15.0004 24.8686 15.0004 25C15.0004 25.1314 14.9745 25.2615 14.9242 25.3829C14.8739 25.5043 14.8002 25.6146 14.7073 25.7075C14.6144 25.8004 14.5041 25.8741 14.3827 25.9244C14.2613 25.9747 14.1312 26.0006 13.9998 26.0006C13.8684 26.0006 13.7383 25.9747 13.6169 25.9244C13.4955 25.8741 13.3852 25.8004 13.2923 25.7075L4.29231 16.7075C4.19933 16.6146 4.12557 16.5043 4.07525 16.3829C4.02493 16.2615 3.99902 16.1314 3.99902 16C3.99902 15.8686 4.02493 15.7385 4.07525 15.6171C4.12557 15.4957 4.19933 15.3854 4.29231 15.2925L13.2923 6.29251C13.4799 6.10487 13.7344 5.99945 13.9998 5.99945C14.2652 5.99945 14.5197 6.10487 14.7073 6.29251C14.895 6.48015 15.0004 6.73464 15.0004 7.00001C15.0004 7.26537 14.895 7.51987 14.7073 7.70751L7.41356 15H26.9998C27.265 15 27.5194 15.1054 27.7069 15.2929C27.8945 15.4804 27.9998 15.7348 27.9998 16Z"
                fill="black"
              />
            </svg>
          </div>
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
