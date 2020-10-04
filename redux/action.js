import * as actiontypes from "./action.types";
import axios from "axios";

const loginUsersstart = () => ({
  type: "loginUser_Start",
  loading: true,
});

export const loginUserSUcess = (user) => 
{
  return   {
    type: actiontypes.loginUser_Success,
    loading: false,
    payload: user,
  }}

const loginUserFailure = (err) => {
  return {
    type: actiontypes.loginUser_failure,
    loading: false,
    payload: err,
  };
};

export const loginOutstart = () => {
  return {
    type: actiontypes.logOut_Start,
    loading: false,
    user: {},
  };
};

export const loginUserStartAxios = (userdata) => {
   
  
  return (dispatch) => {
    dispatch(loginUsersstart());
    const headers = {
        'Content-Type': 'application/json',
        // 'Authorization': 'JWT '
      }
  

      const data =
      {
        "userName": userdata.email,
        "password": userdata.password,
      }




    //   { 
    //     "password":"wale1234",
    //     "userName":"martins1234"
    //     }
axios.post("https://tutor-app2.herokuapp.com/Api/v1/tutors/login",data)
    .then((res) => {
        dispatch(loginUserSUcess(res.data))
        console.log(res.data)
        })
    .catch((err) => {
      loginUserFailure(err);
      console.log(err);
    });




    
  };
};


// return axios({
//     method: "post",
//     url: "/login",
//     headers: { "Content-Type": "application/json" },
//     data: {
//       email: userdata.email,
//       pasword: userdata.password,
//     }
//   })
//     .then((res) => dispatch(loginUserSUcess(res)))
//     .catch((err) => {
//       loginUserFailure(err);
//       console.log(err);
//     });