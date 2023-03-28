import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactsList from './ContactsList/ContactsList';
import ContactsForm from './ContactsForm/ContactsForm';
import Filter from './Filter/Filter';

const DEFAULT_STATE = {
  contacts: [
    { id: 'id-1', name: 'Eden Clements', number: '645-17-79' },
  ],
  filter: '',
};

const LS_KEY = 'contacts';

export default class App extends Component {
  state = DEFAULT_STATE;

  componentDidMount() {
    const dataFromLS = JSON.parse(localStorage.getItem(LS_KEY));

    if (dataFromLS) {
      this.setState(() => ({
        contacts: dataFromLS
      }));
    }
  }

  componentDidUpdate() {
    this.state.contacts.length !== 0 ?
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts))
      : localStorage.removeItem(LS_KEY);
  }

  addSumbitHandler = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const isHaveDublicateName = this.state.contacts.find(
      contact => contact.name === name
    );

    if (isHaveDublicateName) {
      alert(`${name} is already in contacts`)
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts]
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContactHandler = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFiltredContacts = () => {
    const { contacts, filter } = this.state;
    const filtredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filtredContacts;
  };

  render() {
    const { contacts, filter } = this.state;
    const contactsCount = contacts.length;
    const filtredContacts = this.getFiltredContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactsForm
          onSubmit={this.addSumbitHandler}
        />
        <h2>Contacts</h2>
        <Filter
          contactsCount={contactsCount}
          value={filter}
          onChange={this.changeFilter}
        />
        <ContactsList
          onDeleteContact={this.deleteContactHandler}
          contacts={filtredContacts}
        />
      </div>
    )
  }
};