import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const currency = '$';

  const calculateAge = (dob) => {
    if (!dob) return null; 
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return null; 

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "Invalid Date";

    const dateArray = slotDate.split('_');
    if (dateArray.length !== 3) return "Invalid Date";

    const monthIndex = Number(dateArray[1]);
    if (monthIndex < 1 || monthIndex > 12) return "Invalid Date";

    return `${dateArray[0]} ${months[monthIndex]} ${dateArray[2]}`;
  };

  const value = {
    calculateAge,
    slotDateFormat,
    currency
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
