import React from "react";
const globalContext = React.createContext({
        userId : "",
        userPhoneNum: "",
        manager:false,
});
export default globalContext;