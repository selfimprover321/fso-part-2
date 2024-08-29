import PropTypes from 'prop-types';

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

export default PersonForm;
