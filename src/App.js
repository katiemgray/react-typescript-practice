import logo from './logo.svg';
import { useState } from 'react';
// import './App.css';
import uuid from 'react-uuid';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [allUsers, setAllUsers] = useState([
    {
      id: uuid(),
      firstName: 'Bob',
      lastName: 'Strong',
      email: 'email@sample.com',
    },
    {
      id: uuid(),
      firstName: 'Mary',
      lastName: 'Strong',
      email: 'email@sample.com',
    },
  ]);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const isValid = firstName !== '' && lastName !== '' && email !== '';

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitted: ${firstName}, ${lastName}, ${email}`);
    setFirstName('');
    setLastName('');
    setEmail('');
    setAllUsers([
      ...allUsers,
      { id: uuid(), firstName: firstName, lastName: lastName, email: email },
    ]);
  };

  const handleDeleteUser = (e) => {
    const id = e.target.getAttribute('id');
    setAllUsers(allUsers.filter((user) => user.id !== id));
  };

  const handleEditClick = (user) => {
    console.log('THIS IS THE USER', user);
    setIsEditing(true);
    setCurrentUser({ ...user });
  };

  const handleEditInputChange = (e) => {
    setCurrentUser({ ...currentUser, text: e.target.value });
    console.log(currentUser);
  };

  const handleUpdateUser = (id, updatedUser) => {
    const updatedItem = allUsers.map((user) => {
      return user.id === id ? updatedUser : user;
    });
    setIsEditing(false);
    setAllUsers(updatedItem);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser(currentUser.id, currentUser);
  };

  return (
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-2 gap-2 py-4">
        <div>
          <h1 className="text-3xl font-bold underline">React Practice App</h1>
          <div className="flex justify-center pt-4">
            <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
              {allUsers.map((u) => {
                return (
                  <li
                    className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
                    key={u.id}
                  >
                    First name: {u.firstName} Last name: {u.lastName} Email:{' '}
                    {u.email}{' '}
                    <span
                      id={u.id}
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={handleDeleteUser}
                    >
                      Delete{' '}
                    </span>
                    <span
                      id={u.id}
                      style={{ color: 'purple', cursor: 'pointer' }}
                      onClick={() => handleEditClick(u)}
                    >
                      Edit
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {isEditing ? (
          <form onSubmit={handleEditFormSubmit} className="w-full max-w-lg">
            <label>
              EDITING First Name:
              <input
                type="text"
                value={currentUser.firstName}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, firstName: e.target.value })
                }
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={currentUser.lastName}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, lastName: e.target.value })
                }
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                value={currentUser.email}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
              />
            </label>
            <input type="submit" value="Submit" />
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <div className="pt-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    First Name
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Last Name
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Email
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3"></div>
                <label className="md:w-2/3 block text-gray-500 font-bold">
                  <input className="mr-2 leading-tight" type="checkbox" />
                  <span className="text-sm">Send me your newsletter!</span>
                </label>
              </div>
              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                    disabled={!isValid}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
            {/* <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  First Name:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <p class="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Last Name:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <label>
                Email:
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <input type="submit" value="Submit" />
            </div>
          </form> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
