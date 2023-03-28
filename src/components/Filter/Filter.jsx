import PropTypes from 'prop-types';

const Filter = ({ value, onChange, contactsCount }) => {
  return (
    <form >
      <div>
        <p >Total contacts: <span >{contactsCount}</span></p>
      </div>
      <label >
        Find contacts by name
        <input
          type="text"
          value={value}
          onChange={onChange}
        />
      </label>
    </form>
  )
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  contactsCount: PropTypes.number
}

export default Filter;