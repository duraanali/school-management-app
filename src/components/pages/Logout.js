import React, {useEffect} from "react";

const logout = (props) => {


 
    localStorage.clear();
    props.history.push("/AdminAccount/dashboard");


  return (
      
    <div>Logging out...</div>
  )

}

  export default logout;