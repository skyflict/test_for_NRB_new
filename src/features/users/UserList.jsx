import { fetchUsers, userDeleted } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

export function UserList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading);

  const handleDelete = (employeeId) => {
    dispatch(userDeleted({ employeeId }));
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Список пользователей</h1>
      </div>
      <div className="row">
        <div>
          <button
            onClick={() => dispatch(fetchUsers())}
            className="button-primary"
          >
            Загрузить данные еще раз
          </button>
        </div>
        <div>
          <Link to="/add-user">
            <button className="button-primary">Добавить пользователя</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {loading ? (
          "Загрузка..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>День рождения</th>
                <th>Рост</th>
              </tr>
            </thead>
            <tbody>
              {entities.length &&
                entities.map(
                  (
                    { employeeId, firstName, lastName, birthday, height },
                    i
                  ) => (
                    <tr key={i}>
                      <td>{employeeId}</td>
                      <td>{firstName}</td>
                      <td>{lastName}</td>
                      <td>{new Date(birthday).toLocaleDateString()}</td>
                      <td>{height}</td>
                      <td>
                        <button onClick={() => handleDelete(employeeId)}>
                          Удалить
                        </button>
                        <Link to={`/edit-user/${employeeId}`}>
                          <button>Изменить</button>
                        </Link>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
