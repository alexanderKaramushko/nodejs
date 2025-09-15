import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Score } from './types';

import './ScoresList.css';

// eslint-disable-next-line react-refresh/only-export-components
export const getScoresQueryKey = (name: string, count: number) => `scores-by-${name}-${count}`;

function ScoresList(props: { name: string; count: number; }) {
  const { name, count } = props;

  const scoresQuery = useQuery({
    queryFn: () => {
      return axios.get<Score[]>('/api/scores', {
        params: {
          name,
        },
      });
    },
    queryKey: [getScoresQueryKey(name, count)],
    enabled: !!name,
  });

  return (
    <table className='scores'>
      <thead>
        <tr>
          <th>
            Название игры
          </th>
          <th>
            Счет
          </th>
        </tr>
      </thead>
      <tbody>
        {scoresQuery.data?.data.map((score) => (
          <tr key={score.userId}>
            <td>{[score.firstName, score.lastName].join(' ')}</td>
            <td>{score.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ScoresList;
