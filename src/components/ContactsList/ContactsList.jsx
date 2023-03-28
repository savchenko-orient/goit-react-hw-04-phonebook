import PropTypes from 'prop-types';

const ContactsList = ({ contacts, onDeleteContact }) => {
  return (<ul >
    {contacts.map(({ id, name, number }) => (
      <li key={id} >
        <span >{name}: </span>
        <span >{number} </span>
        <button
          type="button"
          onClick={() => onDeleteContact(id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>)
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  onDeleteContact: PropTypes.func
}

export default ContactsList;