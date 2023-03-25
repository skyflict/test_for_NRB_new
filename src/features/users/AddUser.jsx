import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { useState } from "react";
import { userAdded } from "./usersSlice";

export function AddUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [height, setHeight] = useState("");
  const [error, setError] = useState(null);

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleBirthday = (e) => setBirthday(e.target.value);
  const handleHeight = (e) => setHeight(e.target.value);

  const usersAmount = useSelector((state) => state.users.entities.length);

  const handleClick = () => {
    if (firstName && lastName && birthday && height) {
      dispatch(
        userAdded({
          employeeId: usersAmount + 1,
          firstName,
          lastName,
          birthday,
          height,
        })
      );

      setError(null);
      history.push("/");
    } else {
      setError("Нужно заполнить все поля");
    }

    setFirstName("");
    setLastName("");
    setBirthday("");
    setHeight("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Добавить пользователя</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="firstNameInput">Имя</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="Имя"
            id="firstNameInput"
            onChange={handleFirstName}
            value={firstName}
          />
          <label htmlFor="lastNameInput">Фамилия</label>
          <input
            className="u-full-width"
            type="text"
            placeholder="Фамилия"
            id="lastNameInput"
            onChange={handleLastName}
            value={lastName}
          />
          <label htmlFor="birthdayInput">Дата рождения</label>
          <input
            className="u-full-width"
            type="date"
            placeholder="Дата рождения"
            id="birthdayInput"
            onChange={handleBirthday}
            value={birthday}
          />
          <label htmlFor="heightInput">Рост</label>
          <input
            className="u-full-width"
            type="number"
            placeholder="Рост"
            id="heightInput"
            onChange={handleHeight}
            value={height}
          />
          {error && error}
          <button onClick={handleClick} className="button-primary">
            Добавить пользователя
          </button>
        </div>
      </div>
    </div>
  );
}
