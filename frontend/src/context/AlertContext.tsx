import  { createContext, useState, useContext, ReactNode } from "react";
import AlertMsg from "../components/alertMsg/AlertMsg";


type AlertType = "success" | "error" | "warning" | "info";

interface AlertContextType {
  showAlert: (type: AlertType, message: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<{
    type: AlertType;
    message: string;
  } | null>(null);

  const showAlert = (type: AlertType, message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000); 
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <AlertMsg
          type={alert.type}
          message={alert.message}
          isOpen={!!alert}
          onClose={() => setAlert(null)}
        />
      )}
    </AlertContext.Provider>
  );
};
