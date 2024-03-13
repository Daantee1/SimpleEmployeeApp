import { useEffect, useState } from "react";

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Props {
  onSelected: (employee: Employee) => void;
  updatedEmployees: Employee | null;
}

const Search = ({ onSelected, updatedEmployees }: Props) => {
  const [employees, setEmployees] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletedEmployees, setDeletedEmployees] = useState<any>([]);
  const [searchAll, setSearchAll] = useState(false);
  const employeesData = "./src/assets/database.json";

  useEffect(() => {
    fetch(employeesData)
      .then((response) => response.json())
      .then((data) => {
        if (updatedEmployees) {
          const filteredData = data.filter(
            (employee: Employee) =>
              !deletedEmployees.includes(employee.id) &&
              employee.id !== updatedEmployees.id
          );
          const newEmployees = [...filteredData, updatedEmployees];
          setEmployees(newEmployees);
          console.log(newEmployees, "zmieniony pracownik");
        } else {
          const filteredData = data.filter(
            (employee: Employee) => !deletedEmployees.includes(employee.id)
          );
          setEmployees(filteredData);
        }
      })
      .catch((error) => console.log(error));
  }, [updatedEmployees, deletedEmployees]);

  const handleSearchAll = () => {
    searchAll ? setSearchAll(false) : setSearchAll(true);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (employeeToDelete: Employee) => {
    const updatedEmployees = employees.filter(
      (employee: any) => employee.id !== employeeToDelete.id
    );
    setEmployees(updatedEmployees);
    const newDeletedEmployees = [...deletedEmployees, employeeToDelete.id];
    setDeletedEmployees(newDeletedEmployees);
  };

  console.log(deletedEmployees, "deletedEmployees");
  return (
    <div className="mt-5 flex flex-col items-center">
      <input
        type="text"
        placeholder="Wyszukaj pracownika"
        className="border border-gray-300 p-2  w-72 rounded-lg text-black "
        value={searchTerm}
        onChange={handleSearch}
      ></input>
      <p className="mt-2">LUB</p>
      <button
        className="p-2 border bg-gray-200 hover:bg-slate-300 mt-2 rounded-lg tracking-wider"
        onClick={handleSearchAll}
      >
        Wyświetl wszystkich użytkowników
      </button>

      <div className="mt-5 w-full flex justify-center">
        <div className="w-auto">
          {searchTerm &&
            employees
              .filter(
                (employee: any) =>
                  employee.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  employee.email
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .filter(
                (employee: any) => !deletedEmployees.includes(employee.id)
              )
              .map((employee: any, index: number) => (
                <div key={index} className="border-b p-2">
                  <p>
                    <a className="font-semibold">Imię i nazwisko:</a>{" "}
                    {employee.name}
                  </p>
                  <p>
                    <a className="font-semibold">Adres e-mail:</a>{" "}
                    {employee.email}
                  </p>
                  <p>
                    <a className="font-semibold">Numer telefonu:</a>{" "}
                    {employee.phone}
                  </p>
                  <div className="justify-center flex">
                    <button
                      className="p-2 border hover:bg-slate-300 mt-2 rounded-lg mr-2 bg-gray-200"
                      onClick={() => handleDelete(employee)}
                    >
                      Usuń
                    </button>
                    <button
                      className="p-2 border hover:bg-slate-300 mt-2 rounded-lg bg-gray-200"
                      onClick={() => onSelected(employee)}
                    >
                      Edytuj
                    </button>
                  </div>
                </div>
              ))}
          {searchAll &&
            !searchTerm &&
            employees
              .filter(
                (employee: any) => !deletedEmployees.includes(employee.id)
              )
              .map((employee: any, index: number) => (
                <div key={index} className="border-b p-2">
                  <p>
                    <a className="font-semibold">Imię i nazwisko:</a>{" "}
                    {employee.name}
                  </p>
                  <p>
                    <a className="font-semibold">Adres e-mail:</a>{" "}
                    {employee.email}
                  </p>
                  <p>
                    <a className="font-semibold">Numer telefonu:</a>{" "}
                    {employee.phone}
                  </p>
                  <div className="justify-center flex">
                    <button
                      className="p-2 border hover:bg-slate-300 mt-2 rounded-lg mr-2 bg-gray-200"
                      onClick={() => handleDelete(employee)}
                    >
                      Usuń
                    </button>
                    <button
                      className="p-2 border hover:bg-slate-300 mt-2 rounded-lg bg-gray-200"
                      onClick={() => onSelected(employee)}
                    >
                      Edytuj
                    </button>
                  </div>
                </div>
              ))}
          {searchTerm && employees.length === 0 && <p>Brak wyników</p>}
        </div>
      </div>
    </div>
  );
};

export default Search;
