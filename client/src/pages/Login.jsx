import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
const URL  ="https://mern-stack-backend-4xqp.onrender.com";

export const Login = () => {
  const [user, setUser] = useState({
  
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const {storeTokenInLs } = useAuth();

const handleInput = (e) => {
  let name = e.target.name;
  let value = e.target.value;

  setUser({
    ...user,
    [name]:value,

  });

};
const handleSubmit = async (e) =>{
  e.preventDefault();
try {
  const response =await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
  },
  body: JSON.stringify(user),
  });

  console.log("login form",response);

  const res_data = await response.json();
  if (response.ok) {
    // alert("Login Successful");
storeTokenInLs(res_data.token);

  setUser({ email: "", password: ""});
  toast.success(
  "Login Successful",
  );
  navigate("/");
}else {
  toast.error(res_data.extraDetails ?  res_data.extraDetails : res_data.message);
  console.log("Invalid Credentials");
}
}
 catch (error) {
  console.log(error);
}
};
    return(

  
    <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                 src="/images/login.png"
                  alt="lets fill the login form"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h2 className="main-heading mb-3">Login form</h2>
                <br />
                <form onSubmit={handleSubmit}>
                  
                  <div>
                    <label htmlFor="email">Email : </label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder=" email"
                    />
                  </div>
                  <br/>
                  <div>
                    <label htmlFor="password">Password : </label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder=" password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
      )
    
  };


