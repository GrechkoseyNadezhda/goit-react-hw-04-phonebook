import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Wrapper, Message } from './App.styled';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onFormSubmit = info => {
    const isContactRepeat = contacts.find(el => el.name === info.name);
    if (isContactRepeat) {
      alert('Already in Contacts');
      return;
    }
    const contact = {
      ...info,
      id: nanoid(),
    };
    setContacts(prevState => [...prevState, contact]);
  };

  const onInputChange = filterValue => {
    setFilter(filterValue);
  };

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteToDo = id => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== id);
    });
  };

  const filterContacts = filteredContacts();
  return (
    <Wrapper>
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={onFormSubmit} />
      {contacts.length > 0 ? (
        <>
          <h2>Contacts</h2>
          <Filter onInputChange={onInputChange} />
          <ContactList list={filterContacts} deleteToDo={deleteToDo} />
        </>
      ) : (
        <Message>Contacts list is empty yet</Message>
      )}
    </Wrapper>
  );
};
