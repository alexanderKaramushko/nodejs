import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { User } from './types';

import './UsersList.css';

export const GET_USERS_QUERY_KEY = 'users';

function UsersList(props: { onGameAdd: (userId: string) => void }) {
  const { onGameAdd } = props;

  const usersQuery = useQuery({
    queryFn: () => {
      return axios.get<User[]>('/api/users');
    },
    queryKey: [GET_USERS_QUERY_KEY],
  });

  return (
    <table className='users'>
      <thead>
        <tr>
          <th>
            Имя игрока
          </th>
          <th>
            Счет
          </th>
          <th>
            Действия
          </th>
        </tr>
      </thead>
      <tbody>
        {usersQuery.data?.data.map((user) => (
          <tr key={user.uuid}>
            <td>{[user.firstName, user.lastName].join(' ')}</td>
            <td>{user.score}</td>
            <td colSpan={2}>
              <button
                onClick={() => {
                  onGameAdd(user.uuid);
                }}
              >
                Добавить игру
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsersList;
