import  {useState}  from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailid, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isStudentHubForm, setIsStudentHubForm] = useState(true);
  const [error, setError] = useState(""); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
       try{
      const res = await axios.post(
        BASE_URL + "/login",
         {
      emailid,
      password,
    },
      { withCredentials: true }
  );
    dispatch(addUser(res.data));
    return navigate("/");
    } catch (err){
    setError(err?.response?.data || "something went wrong"); 
     }
 };
  
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailid, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    }  catch (err) {
      setError(err?.response?.data || "something went wrong"); 
    }
  };
  return(
    <div className="flex justify-center my-10" > 
     <div className="card bg-base-300 w-96 shadow-sm">
      <div className="card-body">
      <h2 className="card-title justify-center">
      {isStudentHubForm ? "Student Hub" : "Sign Up"}
      </h2>
      <div>
        {!isStudentHubForm && (
         <>
  <label className="form-control w-full max-w-xs my-2">
    <div className="label flex justify-between">
      <span className="label-text">First Name</span>
      </div>
    <input
      type="text"
      value={firstName}
      placeholder="Type here"
      className="input input-bordered w-full max-w-xs"
      onChange={(e) => setFirstName(e.target.value)}
    />
     </label>
     <label className="form-control w-full max-w-xs my-2">
    <div className="label flex justify-between">
      <span className="label-text">Last Name</span>
      </div>
    <input
      type="text"
      value={lastName}
      placeholder="Type here"
      className="input input-bordered w-full max-w-xs"
      onChange={(e) => setLastName(e.target.value)}
    />
     </label>
     </>
  )}
     <label className="form-control w-full max-w-xs my-2">
    <div className="label flex justify-between">
      <span className="label-text">Email ID:</span>
      </div>
    <input
      type="text"
      value={emailid}
      placeholder="Type here"
      className="input input-bordered w-full max-w-xs"
      onChange={(e) => setEmailId(e.target.value)}
    />
     </label>
     <label className="form-control w-full max-w-xs my-2">
    <div className="label flex justify-between">
      <span className="label-text">Password</span>
      </div>
    <input
      type="text"
      value={password}
      placeholder="Type here"
      className="input input-bordered w-full max-w-xs"
      onChange={(e) => setPassword(e.target.value)}
    />
     </label>
</div>
 <p className="text-red-500">{error}</p>
 <div className="card-actions justify-center m-2">
        <button className="btn btn-primary" 
        onClick={isStudentHubForm ? handleLogin : handleSignUp} >
          {isStudentHubForm ? "Login": "Sign up"}
          </button>
      </div>
       
      <p className="m -auto cursor-pointer py-2"
       onClick={() => setIsStudentHubForm((value) => !value)}>
        {isStudentHubForm
        ? "New Uswe? Signup Here"
        : "Existing User? Login Here"}
      </p>
    </div>
   </div>
  </div>
    );
};
export default Login;
