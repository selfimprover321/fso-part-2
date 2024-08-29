import { useState, useEffect } from 'react';
import services from './services/people';
import PropTypes from 'prop-types';

const Filter = ({ filter, changeFilter }) => (
  <div>
    filter shown with <input value={filter} onChange={changeFilter} />
  </div>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

const PersonForm = ({ addNewName, newName, newNumber, handleNameChange, handleNumberChange }) => (
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

PersonForm.propTypes = {
  addNewName: PropTypes.func.isRequired,
  newName: PropTypes.string.isRequired,
  newNumber: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleNumberChange: PropTypes.func.isRequired,
};

const deletingNames = async (id, persons, setPersons) => {
  try {
    await services.deleteName(id);
    setPersons(persons.filter(person => person.id !== id));
  } catch (error) {
    console.error('Delete person failed:', error);
  }
};

const Persons = ({ persons, filter, setPersons }) => (
  <div>
    {persons
      .filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase()) ||
        person.number.includes(filter)
      )
      .map(person => (
        <div key={person.id}>
          <p>Name: {person.name}; Number: {person.number}</p>
          <button onClick={() => deletingNames(person.id, persons, setPersons)}>delete</button>
        </div>
      ))}
  </div>
);

Persons.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  filter: PropTypes.string.isRequired,
  setPersons: PropTypes.func.isRequired,
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    services.fetchData().then(data => setPersons(data));
  }, []);

  const addNewName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
  
    if (existingPerson && existingPerson.number !== newNumber) {
      services.editPhoneNumber(existingPerson.id, {
        name: existingPerson.name,
        number: newNumber,
      })
      .then(updatedPerson => {
        setPersons(persons.map(person => 
          person.id !== existingPerson.id ? person : updatedPerson
        ));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.error('Updating phone number failed:', error);
        setMessage(`Failed to update ${existingPerson.name}'s number`);
        setTimeout(() => setMessage(null), 5000);
      });
    } else if (existingPerson && existingPerson.number === newNumber) {
      setMessage(`${newName} is already added to phonebook`);
      setTimeout(() => setMessage(null), 5000);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
  
      services.addPerson(personObject)
        .then(data => {
          setPersons(persons.concat(data));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.error('Adding new person failed:', error);
          setMessage('Failed to add new person');
          setTimeout(() => setMessage(null), 5000);
        });
    }
  };
  
  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const changeFilter = (event) => setFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <div>{message}</div>}
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
      <Persons persons={persons} filter={filter} setPersons={setPersons} />
    </div>
  );
};
export default App;
