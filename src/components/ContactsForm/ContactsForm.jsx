import { useState } from 'react'
import PropTypes from 'prop-types'

export default function ContactsForm(props) {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const handleNameChange = (e) => {
    const { value } = e.currentTarget;
    setName(name => name = value);
  };
  const handleNumberChange = (e) => {
    const { value } = e.currentTarget;
    setNumber(number => number = value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({ name, number });
    setName(name => name = '');
    setNumber(number => number = '');
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label >
          Number
          <input
            type="tel"
            name="number"
            value={number}
            onChange={handleNumberChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">
          Add contacts
        </button>
      </form>
    </div>
  )
}


ContactsForm.propTypes = {
  onSubmit: PropTypes.func
}

