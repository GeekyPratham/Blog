import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { SignupInput , SigninInput} from "@geekypratham/blog-common";
import { signupInputs, signinInputs } from "@geekypratham/blog-common";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export const Auth = ({type}:{type:"Signup" | "Signin"}) => {

    const navigate = useNavigate();
    const [error, setError] = useState("");

    const [postInputs, setPostInputs] = useState<SignupInput | SigninInput>(() => {
      if (type === "Signup") {
        return {
          name: "",
          email: "",
          password: "",
        } 
      } else {
        return {
          email: "",
          password: "",
        }
      }
    });

    return (
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-3">{type==="Signup" ? "Create an account" : "Login in your account"}</h2>
          <p className="text-gray-300 mb-6">
            {type === "Signup"? "Already have an account? " : "Don't have an account? "}
            <Link to={type=== "Signup"?"/signin"  : "/signup"} className="text-blue-400 hover:underline">
                {type === "Signup" ? "Login" : "Signup"}
            </Link>
          </p>
          {
            type === "Signup" ?
              <LabelInput label="Name" placeholder="Pratham Raj" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name: e.target.value
                })
              }}></LabelInput> : null}
          <LabelInput label="Email" placeholder="pra@gmail.com" type="email" onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                email: e.target.value
            })
          }}></LabelInput>
          <LabelInput label="Password" placeholder="PrathamRaj" type="password" onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                password: e.target.value
            })
          }}></LabelInput>

          {error && (
            <div className="mb-4 text-red-400 font-medium">
              {error}
            </div>
          )}
          <button className="w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" onClick={ async ()=>{
            // Handle form submission here

            const schema = type === "Signup" ? signupInputs : signinInputs;
            const result = schema.safeParse(postInputs);// Validate the data using Zod does not need to send request to backend for validation

            if (!result.success) { 
              setError(result.error.issues[0].message);
              // alert("incorrect user details");
              return;
            }

            //  Valid data
            setError("");
            console.log("Validated data:", result.data);

            await axios.post(

              `${BACKEND_URL}/api/v1/user/${type === "Signup" ? "signup" : "signin"}`,
            
              result.data
            ).then((res) => { 
              console.log("Response from server:", res.data);
              console.log("getting data");
              if (res.data.token) {
                // Successfully signed up or signed in
                localStorage.setItem("token",res.data.token);
                navigate("/blogs");
              } else {
                // Handle error from server
                setError(res.data.message || "An error occurred");
              }
            }).catch((err) => {
              console.error("Error during request:", err);
              console.log(err.response.data)
              setError(err.response.data || "An error occurred");
            });

           
          }}> 
            {type==="Signup"? "Sign Up" : "Sign In"}
          </button>
        </div>
    );
};

interface LabelInputTypes {
    label : string;
    placeholder : string;
    onChange : (e : ChangeEvent<HTMLInputElement>) => void;
    type ?: "text" | "email" | "password";
}
function LabelInput({ label, placeholder, onChange, type = "text" }: LabelInputTypes) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
