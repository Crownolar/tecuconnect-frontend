import { AuthProvider } from "../context/AuthContext";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default Providers;