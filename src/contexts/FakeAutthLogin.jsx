import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const intialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Yuvaraj",
  email: "yuvi@example.com",
  password: "qwerty",
  avatar:
    "https://media.licdn.com/dms/image/v2/D5603AQE7uJhSnor5qg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1668658806784?e=1730332800&v=beta&t=nFsMQmdCvuqnqinG6eFO4lYDBj8YIG0PsSptBshhj9A",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    intialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout", payload: FAKE_USER });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("AuthContext was used outside");
  return context;
}

export { AuthProvider, useAuth };
