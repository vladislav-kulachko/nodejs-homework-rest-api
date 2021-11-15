const fs = require("fs/promises")
const {pathToFileURL} = require("url")
// const path = require("path")
const randId = require("crypto").randomUUID

const contactsPath = pathToFileURL("model/contacts.json")

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath)
  return JSON.parse(contacts)
}

const getContactById = async contactId => {
  const list = await listContacts()
  const contactById = list.find(({id}) => id === contactId)
  return contactById
}

const removeContact = async contactId => {
  const list = await listContacts()
  const find = list.find(({id}) => id === contactId)
  if (find) {
    const filteredList = list.filter(({id}) => id !== contactId)
    await fs.writeFile(contactsPath, JSON.stringify(filteredList, null, 2))
  }
  return find
}

const addContact = async body => {
  const newContact = {id: randId(), ...body}
  const list = await listContacts()
  list.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2))
  return newContact
}

const updateContact = async (contactId, body) => {
  const {name, phone, email} = body
  const contact = await getContactById(contactId)
  if (contact) {
    if (name) {
      contact.name = name
    }
    if (phone) {
      contact.phone = phone
    }
    if (email) {
      contact.email = email
    }
    const list = await listContacts()
    const filteredList = list.filter(({id}) => id !== contactId)
    const newList = [...filteredList, contact]
    await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2))
  }
  return contact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
