import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

import './UserForm.css';
import { GET_USERS_QUERY_KEY } from './UsersList';

function UserForm() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (payload: {
      firstName: string;
      lastName: string;
      score: number;
    }) => {
      return axios.post('/api/create', payload);
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [GET_USERS_QUERY_KEY],
      });
    }
  });

  const [state, setState] = useState<{
    firstName: string;
    lastName: string;
    score: number;
  }>({
    firstName: '',
    lastName: '',
    score: 0,
  });

  return (
    <div className='user-form'>
      <div>
        <label htmlFor="firstName">Имя</label> <br />
        <input id='firstName' type="text" onChange={(event) => {
          const value = event.target.value;
          if (value) {
            setState((state) => ({
              ...state,
              firstName: value
            }));
          }
        }} />
      </div>
      <div>
        <label htmlFor="firstName">Фамилия</label> <br />
        <input id='lastName' type="text" onChange={(event) => {
          const value = event.target.value;
          if (value) {
            setState((state) => ({
              ...state,
              lastName: value
            }));
          }
        }} />
      </div>
      <div>
        <label htmlFor="score">Общий счет</label> <br />
        <input id='score' type="number" onChange={(event) => {
          const value = event.target.value;
          if (value) {
            setState((state) => ({
              ...state,
              score: Number.parseInt(value, 10)
            }));
          }
        }} />
      </div>
      <button onClick={() => {
        createMutation.mutate({
          firstName: state.firstName,
          lastName: state.lastName,
          score: state.score
        });
      }}>Создать пользователя</button>       
    </div>
  );
}

export default UserForm;
