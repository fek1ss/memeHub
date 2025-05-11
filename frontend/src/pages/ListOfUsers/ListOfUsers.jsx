import { useEffect, useState } from 'react';
import { banUser, getAllUsers } from '../../services/userService';
import styles from './styles.module.css';

const ListOfUsers = () => {
  let newBanStatus;
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (response.ok) {
        setUsers(response.users);
        return;
      }
      setMessage('Users not found');
    };
    fetchUsers();
    console.log('render');
  }, [newBanStatus]);

  const handleBan = async (id, currentBanStatus) => {
    newBanStatus = currentBanStatus === 'true' ? 'false' : 'true';
    const response = await banUser(newBanStatus, id);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const updatedUser = await response.json();

    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id
          ? { ...user, isBanned: updatedUser.isBanned }
          : user,
      ),
    );
  };

  return (
    <ul className={styles.listOfUsers}>
      {message}
      {users.map(user => (
        <div className={styles.user} key={user.id}>
          <p>username: {user.username}</p>
          <p>role: {user.role}</p>
          <p>
            is banned: {`${user.isBanned === 'true' ? 'yes' : 'no'}`}{' '}
            <button
              className={styles.btn}
              onClick={() => handleBan(user.id, user.isBanned)}
            >
              {user.isBanned === 'false' ? 'BAN' : 'UNBAN'}
            </button>{' '}
          </p>
        </div>
      ))}
    </ul>
  );
};

export default ListOfUsers;
