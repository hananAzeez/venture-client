/* eslint-disable @next/next/no-img-element */
const Login = () => {
  return (
    <main>
      <div className="grid lg:grid-cols-2 h-screen overflow-hidden">
        <div className="h-full w-full flex items-center justify-center px-5 lg:px-0">
          <div className="flex flex-col lg:w-2/3 xl:w-1/2 mx-auto">
            <h1 className="text-4xl font-bold text-dark">Welcome back!</h1>
            <h3 className="mt-4 text-xl font-medium text-light">
              Get ready to venture
            </h3>
            <form className="mt-8">
              <input
                type="email"
                placeholder="Email address"
                className="rounded-xl p-4 border border-light border-opacity-60 w-full "
              />
              <input
                type="password"
                placeholder="Password"
                className="mt-4 rounded-xl p-4 border border-light border-opacity-60 w-full "
              />
              <button className="mt-8 text-white font-semibold rounded-xl text-lg p-5 w-full bg-green">
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="w-full h-full">
          <img
            src="img/loginImg.jpg"
            alt="hiking"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </main>
  );
};

export default Login;
