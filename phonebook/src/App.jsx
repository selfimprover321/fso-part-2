import { useState, useEffect, useCallback } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import services from './components/services/people';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [messageClass, setMessageClass] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await services.fetchData();
        setPersons(data);
      } catch (error) {
        console.error('Fetching data failed:', error);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addNewName = useCallback(async (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
  
    if (existingPerson) {
      if (existingPerson.number !== newNumber) {
        try {
          const updatedPerson = await services.editPhoneNumber(existingPerson.id, {
            name: existingPerson.name,
            number: newNumber,
          });
          setPersons(persons.map(person =>
            person.id !== existingPerson.id ? person : updatedPerson
          ));
          setNewName('');
          setNewNumber('');
          setMessage(`Updated ${existingPerson.name}'s number`);
          setMessageClass('success-message');
        } catch (error) {
          console.error('Updating phone number failed:', error);
          setMessage(`Failed to update ${existingPerson.name}'s number`);
          setMessageClass('error-message');
        }
      } else {
        setMessage(`${newName} is already added to phonebook`);
        setMessageClass('info-message');
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
  
      try {
        const data = await services.addPerson(personObject);
        setPersons(persons.concat(data));
        setNewName('');
        setNewNumber('');
        setMessage(`Added ${data.name}`);
        setMessageClass('success-message');
      } catch (error) {
        console.error('Adding new person failed:', error);
        setMessage('Failed to add new person');
        setMessageClass('error-message');
      }
    }
    setTimeout(() => {
      setMessage(null);
      setMessageClass('');
    }, 5000);
  }, [persons, newName, newNumber]);

  const handleNameChange = useCallback((event) => setNewName(event.target.value), []);
  const handleNumberChange = useCallback((event) => setNewNumber(event.target.value), []);
  const changeFilter = useCallback((event) => setFilter(event.target.value), []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <p className={messageClass}>{message}</p>}
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
      <Persons persons={persons} filter={filter} setPersons={setPersons} setMessage = {setMessage} setMessageClass = {setMessageClass}/>
    </div>
  );
};

export default App;
