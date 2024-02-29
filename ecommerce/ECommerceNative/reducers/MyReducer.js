const MyReducer = (currentState, action) => {
  switch (action.type) {
    case "login":
      return action.payload;
    case "logout":
      return {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        phone: "",
        avatar:
          "https://res.cloudinary.com/dndakokcz/image/upload/v1707039554/vemkgus0ecwhtzwdech2.jpg",
      };
    case "refresh":
      return action.user;
  }
  return currentState;
};

export default MyReducer;
