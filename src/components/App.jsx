import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactsList from './ContactsList/ContactsList';
import ContactsForm from './ContactsForm/ContactsForm';
import Filter from './Filter/Filter';

const LS_KEY = 'contacts';

export default function App() {
  const useLockalStorage = (key, defaultValue) => {
    const [state, setState] = useState(() => {
      return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue
    });

    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
  }

  const [contacts, setContacts] = useLockalStorage(LS_KEY, []);
  const [filterQuery, setFilter] = useState('');

  const addSumbitHandler = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const isHaveDublicateName = contacts.find(
      contact => contact.name === name
    );

    if (isHaveDublicateName) {
      alert(`${name} is already in contacts`)
      return;
    }
    setContacts([...contacts, contact])
  };

  const changeFilter = e => setFilter(e.target.value);
  const deleteContactHandler = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    window.localStorage.setItem(LS_KEY, JSON.stringify(updatedContacts));
  };

  const getFiltredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterQuery.toLowerCase())
    );
  }

  const contactsCount = contacts.length;
  const filtredContacts = getFiltredContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactsForm
        onSubmit={addSumbitHandler}
      />
      <h2>Contacts</h2>
      <Filter
        contactsCount={contactsCount}
        value={filterQuery}
        onChange={changeFilter}
      />
      <ContactsList
        onDeleteContact={deleteContactHandler}
        contacts={filtredContacts}
      />
    </div>
  )
}