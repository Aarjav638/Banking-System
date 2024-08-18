import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your context state
interface AccountTypeContextProps {
  accountType: string;
  setAccountType: React.Dispatch<React.SetStateAction<string>>;
}

// Provide a default value that matches the expected shape
const AccountTypeContext = createContext<AccountTypeContextProps | undefined>(
  undefined
);

// Create a provider component
export const AccountTypeProvider = ({ children }: { children: ReactNode }) => {
  const [accountType, setAccountType] = useState<string>("savings");

  return (
    <AccountTypeContext.Provider value={{ accountType, setAccountType }}>
      {children}
    </AccountTypeContext.Provider>
  );
};

export const useAccountType = () => {
  const context = useContext(AccountTypeContext);
  if (!context) {
    throw new Error(
      "useAccountType must be used within an AccountTypeProvider"
    );
  }
  return context;
};
