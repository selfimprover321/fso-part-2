/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import services from './services/people';

const Persons = ({ persons, filter, setPersons , setMessage, setMessageClass}) => {
  const handleDelete = async (id) => {
    try {
      await services.deleteName(id);
      setPersons(persons.filter(person => person.id !== id));
      setMessage(`Removed message`);
      setMessageClass('remove-message');
    } catch (error) {
      console.error('Delete person failed:', error);
    }
  };

  return (
    <div>
      {persons
        .filter(person =>
          person.name.toLowerCase().includes(filter.toLowerCase()) ||
          person.number.includes(filter)
        )
        .map(person => (
          <div key={person.id}>
            <p>Name: {person.name}; Number: {person.number}</p>
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </div>
        ))}
    </div>
  );
};

Persons.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  filter: PropTypes.string.isRequired,
  setPersons: PropTypes.func.isRequired,
};

export default Persons;
