import {useNavigate } from "react-router-dom"
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-400 relative overflow-hidden px-6">
   
      <div className="absolute top-6 left-6 bg-black text-white px-3 py-1 rounded-lg">
        <span className="text-lg font-bold">taskini</span>
      </div>

      {/* Abstract Shapes */}
      <div className="absolute inset-0">
        <div className="absolute w-4 h-4 bg-black rounded-full top-20 left-16"></div>
        <div className="absolute w-3 h-3 bg-white rounded-full top-24 right-14"></div>
        <div className="absolute w-4 h-4 bg-green-500 rounded-sm top-20 left-40"></div>
        <div className="absolute w-5 h-5 bg-blue-600 rounded-sm bottom-40 left-14"></div>
        <div className="absolute w-5 h-5 bg-purple-600 rounded-sm top-56 right-10"></div>
        <div className="absolute w-6 h-6 bg-white rounded-full bottom-24 right-28"></div>
        <div className="absolute border border-black w-14 h-14 rounded-full bottom-10 right-6"></div>

        {/* Additional Stylish Shapes */}
        <div className="absolute w-6 h-6 border-black rounded-full top-20 left-20"></div>
        <div className="absolute w-8 h-8 bg-red-500 rounded-lg top-28 right-20 rotate-12"></div>
        <div className="absolute w-6 h-6 bg-indigo-500 rounded-full bottom-32 left-24 shadow-lg"></div>
        <div className="absolute w-10 h-10 bg-teal-400 rounded-xl bottom-20 right-40"></div>
        <div className="absolute w-7 h-7 bg-pink-500 rounded-sm top-48 left-12 rotate-45"></div>
        <div className="absolute w-12 h-12 bg-cyan-600 rounded-lg bottom-10 left-52 opacity-75"></div>
        <div className="absolute w-5 h-5 bg-orange-500 rounded-full top-64 right-28 animate-bounce"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-black">
          Convenient and productive task manager <span>😎</span>
        </h1>
        <p className="text-black mt-4 text-lg">
          We have created an intuitive and convenient interface for teamwork.
        </p>
      </div>

      {/* Button */}
      <button className="relative z-10 mt-8 bg-black text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-gray-900 transition" onClick={()=>navigate("/login")}>
        Get started
      </button>
    </div>
  );
}   
export default HomePage;
