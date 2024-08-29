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

export default Filter;
