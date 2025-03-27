import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //on va récupere the user
  const { user } = useSelector((state) => state.auth);
  //use the useForm hook pour extraire les valeurs des input in order to whrite the onchange
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submit = async (data) => {
    console.log("login", data);
    try {
        const response = await fetch("http://localhost:9000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include", // to ensure cookies are sent and received
        });
console.log("Response login:", response);
        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData); // Log the response to ensure token is there

            const { token, user } = responseData; // Token should now be part of the response
console.log("Token login:", token);
            if (token) {
                // Save token to localStorage
                localStorage.setItem("authToken", token);
                // Save user data in Redux if needed
                dispatch(setCredentials(user));
console.log("User login:", user);
               // Navigate to the user page
               if(user.isAdmin){
                navigate("/AdminPage");
               }else{
                navigate("/UserPage");}
            } else {
                console.log("Token is missing in the response.");
            }
        } else {
            const error = await response.json();
            console.error("Login failed: ", error);
        }
    } catch (err) {
        console.log(err);
    }
};


  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-yellow-400">
      <form
        onSubmit={handleSubmit(submit)}
        className="form-container w-full md:w-[400px] bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="email"
            {...register("email", { required: "email is required" })}
            className="w-full p-3 border border-gary-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="password"
            {...register("password", { required: "password is required" })}
            className="w-full p-3 border border-gary-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.password && (
            <span className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 rounded-2xl font-bold hover:bg-green-200 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
