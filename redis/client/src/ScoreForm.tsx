import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

import './ScoreForm.css';
import { GET_USERS_QUERY_KEY } from './UsersList';

function ScoreForm(props: { userId: string }) {
  const { userId } = props;

  const queryClient = useQueryClient();

  const createScoreMutation = useMutation({
    mutationFn: (payload: {
      userId: string;
      name: string;
      score: number;
    }) => {
      return axios.post(`/api/score/add/${payload.userId}`, {
        name: payload.name,
        score: payload.score,
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [GET_USERS_QUERY_KEY],
      });
    }
  });

  const [state, setState] = useState<{
    name: string;
    score: number;
  }>({
    name: '',
    score: 0,
  });

  return (
    <div className='score-form'>
      <div>
        <label htmlFor="name">Название игры</label> <br />
        <input id='name' type="text" onChange={(event) => {
          const value = event.target.value;
          if (value) {
            setState((state) => ({
              ...state,
              name: value
            }));
          }
        }} />
      </div>
      <div>
        <label htmlFor="score">Счет</label> <br />
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
        createScoreMutation.mutate({
          userId,
          name: state.name,
          score: state.score,
        });
      }}>Создать счет</button>       
    </div>
  );
}

export default ScoreForm;
