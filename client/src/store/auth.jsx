
import { createContext, useContext, useEffect, useState } from "react";

 export const AuthContext = createContext();

  // eslint-disable-next-line react/prop-types
  export const  AuthProvider = ({ children }) => {

const [token, setToken ] = useState(localStorage.getItem("token"));
const [user, setUser] = useState("");
const [isLoading, setISLoading] = useState(true);
const [services , setServices] = useState([]);
const authorizationToken = `Bearer ${token}`;

const storeTokenInLs = (serverToken) => {
  setToken(serverToken);
return localStorage.setItem("token", serverToken);
};

let isLoggedIn = !!token;
console.log("isLoggedIn ", isLoggedIn);

// tackling logout functionality

const LogoutUser = () => {
setToken("");
return localStorage.removeItem("token");
};

//JWT  Authentication - to get currently  loggedIN user data 

const userAuthentication = async () => {
try {
  setISLoading(true);
  const response = await fetch ("http://localhost:5000/api/auth/user",
    {
     method: "GET",
     headers: {
       Authorization: authorizationToken,
     },
  });
  if (response.ok){
    const data = await response.json();
    console.log("user data", data.userData);
    setUser(data.userData);
     setISLoading(false);
  }else{
  console.log("error in fetching user data");
     setISLoading(false);
  }
} catch (error) {
  console.log("error in fetching user data");
}
};

// fetching services from server (database) 

const getServices = async () => {
try {
  const response = await fetch("http://localhost:5000/api/data/service", 
    {
      method: "GET",
    });
if(response.ok){
  const data = await response.json();
  console.log(data.msg);
  setServices(data.msg);
}

} catch (error) {
  console.log(`services frontend error: ${error}`);
  
}
}
useEffect(() => {
  getServices();
userAuthentication();
},[]);


    return( <AuthContext.Provider value={ { isLoggedIn, storeTokenInLs, LogoutUser, user, services, authorizationToken, isLoading }}> 
    {children}
    </AuthContext.Provider>
    );
 };

 // eslint-disable-next-line react-refresh/only-export-components
 export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContextValue;
 };