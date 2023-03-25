import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { useState } from "react";
import { userUpdated } from "./usersSlice";

export function EditUser() {
  const { pathname } = useLocation();
  const employeeId = parseInt(pathname.replace("/edit-user/", ""));

  const user = useSelector((state) =>
    state.users.entities.find((user) => user.employeeId === employeeId)
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [birthday, setBirthday] = useState(user.birthday);
  const [height, setHeight] = useState(user.height);
  const [error, setError] = useState(null);

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleBirthday = (e) => setBirthday(e.target.value);
  const handleHeight = (e) => setHeight(e.target.value);

  const handleClick = () => {
    if (firstName && lastName && birthday && height) {
      dispatch(
        userUpdated({
          employeeId: employeeId,
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
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Редактировать данные</h1>
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
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
