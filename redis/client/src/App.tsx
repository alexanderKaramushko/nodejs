import UserForm from './UserForm';

import './App.css';
import UsersList from './UsersList';
import { useState } from 'react';
import ScoreForm from './ScoreForm';
import ScoresList from './ScoresList';

function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [topCount, setTopCount] = useState(5);

  return (
    <div className='app'>
      <div className='forms'>
        <UserForm />
        {userId && (
          <ScoreForm userId={userId} />
        )}
      </div>
      <div>
        <h2 className='title'>Пользователи</h2>
        <UsersList onGameAdd={setUserId} />
      </div>
      <div>
        <h2 className='title'>Счет</h2>
        <div className='name-filter'>
          <label htmlFor="name">Название игры</label> <br />
          <input id='name' type="text" onChange={(event) => {
            const value = event.target.value;

            if (value) {
              setName(value);
            }
          }} />
          <button onClick={() => setTopCount(5)}>ТОП-5</button>
          <button onClick={() => setTopCount(10)}>ТОП-10</button>
        </div>
        <ScoresList name={name} count={topCount} />
      </div>
    </div>
  );
}

export default App;
