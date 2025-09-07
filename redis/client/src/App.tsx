import UserForm from './UserForm';

import './App.css';
import UsersList from './UsersList';

function App() {
  return (
    <div className='app'>
      <div className='forms'>
        <UserForm />
        <div>
          <h2 className='title'>Пользователи</h2>
          <UsersList />
        </div>
      </div>
    </div>
  );
}

export default App;
