import { useState } from "react";

interface Employee {
  name: string;
  email: string;
  phone: string;
}
interface Props {
  setUpdatedEmployee: (employees: Employee) => void;
  selectedEmployee: Employee;
  
}
const editEmployee = ({  setUpdatedEmployee, selectedEmployee }: Props) => {
  const [name, setName] = useState(selectedEmployee.name);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [phone, setPhone] = useState(selectedEmployee.phone);
  const handleSubmit = (e: any) => {
  
    e.preventDefault();
    const updatedEmployee = { ...selectedEmployee, name, email, phone };
    setUpdatedEmployee(updatedEmployee);
  };
  return (
    <>
      <div className="">
        <h3 className="text-center text-2xl mt-5">Edytuj pracownika</h3>
        <form
          className="flex flex-col items-center mt-5"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Imię i nazwisko"
            className="border border-gray-300 p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Adres e-mail"
            className="border border-gray-300 p-2 mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
           <input
            type="text"
            placeholder="Numer telefonu"
            className="border border-gray-300 p-2 mt-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></input>
          <button
            type="submit"
            className="p-2 border hover:bg-slate-300 mt-2 rounded-lg bg-gray-200"
          >
            Zapisz
          </button>
        </form>
      </div>
    </>
  );
};

export default editEmployee;
