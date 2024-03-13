import { useState } from "react";
import EditEmployee from "./editEmployee";
import Search from "./search";

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;

}

const Home = () => {
  const [changeEmployee, setChangeEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [updatedEmployee, setUpdatedEmployee] = useState<Employee | null>(null);
  const handleSelected = (employee: any) => {
    setSelectedEmployee(employee);
    setChangeEmployee(true);
  };
  const handleEmployeeUpdated = (updatedEmployee: any) => {
    setChangeEmployee(false);
    setUpdatedEmployee(updatedEmployee);
  };

  return (
    <>
      <h3 className="text-center mt-5 mb-2 text-3xl">Edytor pracowników</h3>
      <div className="flex justify-center items-center w-full font-body">
       {!changeEmployee &&<Search onSelected={handleSelected} updatedEmployees={updatedEmployee}></Search>} 

        {changeEmployee && selectedEmployee &&<EditEmployee  selectedEmployee={selectedEmployee} setUpdatedEmployee={handleEmployeeUpdated}></EditEmployee>}
      </div>
    </>
  );
};

export default Home;
