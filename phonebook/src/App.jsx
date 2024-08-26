/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const Filter = ({ filter, changeFilter }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={changeFilter} />
    </div>
  );
};

const PersonForm = ({ addNewName, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <div>
      <form onSubmit={addNewName}>
        <div>
          <div>name: <input value={newName} onChange={handleNameChange} /></div>
          <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Persons = ({ persons, filter }) => {
  return (
    <div>
      {persons
        // eslint-disable-next-line react/prop-types
        .filter(person =>
          person.name.toLowerCase().includes(filter.toLowerCase()) ||
          person.phone.includes(filter)
        )
        .map(person => (
          <p key={person.id}>Name: {person.name}; Number: {person.number}</p>
        ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/persons');
      const data = await response.json();
      setPersons(data);
    };

    fetchData();
  }, []);

  function addNewName(event) {
    event.preventDefault();
    let copied = false;

    persons.forEach((person) => {
      if (newName === person.name) {
        copied = true;
        alert(`${newName} is already added to phonebook`);
      }
    });

    if (!copied) {
      const personObject = {
        name: newName,
        id: String(persons.length + 1),
        number: String(newNumber)
      };

      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  }

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function handleNumberChange(event) {
    setNewNumber(event.target.value);
  }

  function changeFilter(event) {
    setFilter(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} changeFilter={changeFilter} />
      <h3>add a new</h3>
      <PersonForm
        addNewName={addNewName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
