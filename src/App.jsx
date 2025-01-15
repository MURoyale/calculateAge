import { useEffect, useState } from "react";
import "./App.css";
import { CgProfile } from "react-icons/cg";
import { Space, Switch } from 'antd';

const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);

  let ageYears = today.getFullYear() - birth.getFullYear();
  let ageMonths = today.getMonth() - birth.getMonth();
  let ageDays = today.getDate() - birth.getDate();

  if (ageMonths < 0) {
    ageMonths += 12;
    ageYears--;
  }

  if (ageDays < 0) {
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
    ageDays += lastMonth.getDate();
    ageMonths--;
  }

  return {
    years: ageYears,
    months: ageMonths,
    days: ageDays,
  };
};

function App() {

  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const data = localStorage.getItem("key");
    setTheme(data);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("key", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleBirthDateChange = (event) => {
    const newBirth = event.target.value;
    setBirthDate(newBirth);

    if (newBirth) {
      const calculatedAge = calculateAge(newBirth);
      setAge(calculatedAge);
    } else {
      setAge(null);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-lvh">
        <div className="bg-sky-600 relative flex justify-center items-center flex-col p-5 w-[300px] h-[270px] rounded-2xl">
          <div className="absolute top-[40px] flex justify-center items-center flex-col">
            <h1 className="text-white text-[18px]">Calculate Your Age</h1>
            <label>
              <input
                className="mt-1 rounded-sm p-1"
                type="date"
                value={birthDate}
                onChange={handleBirthDateChange}
              />
            </label>
            <div className="mt-[10px] flex justify-center items-center gap-2">
              <CgProfile style={{ color: "#fff", fontSize: "20px" }} />
              <h1 className="text-white text-[18px]">your age :</h1>
            </div>
          </div>

          <div className="text-black mt-[80px] bg-white rounded-sm p-[4px]">
            <p>
              {age
                ? `${age.years} years, ${age.months} months, ${age.days} days`
                : "No age data available"}
            </p>
          </div>
          <div className="absolute bottom-[30px] left-[50px]">
          <Switch checkedChildren="light" unCheckedChildren="dark" checked={theme === "light"} onChange={toggleTheme} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
