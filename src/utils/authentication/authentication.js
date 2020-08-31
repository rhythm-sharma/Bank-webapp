const isLogin = () => {
  const currentUser = sessionStorage.currentUser;
  console.log("currentUser: ", currentUser);
  if (
    currentUser === undefined ||
    currentUser === "undefined" ||
    currentUser === null ||
    currentUser === "null" ||
    currentUser === ""
  ) {
    return false;
  } else {
    return true;
  }
};

const loginUser = (value) => {
  sessionStorage.currentUser = value;
  // Redirect to Dashboard
  window.location.href = "/dashboard";
};

const logoutUser = () => {
  sessionStorage.currentUser = null;
  window.location.href = "/login";
};

export { isLogin, loginUser, logoutUser };
