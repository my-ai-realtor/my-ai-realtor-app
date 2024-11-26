import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Addresses } from '../../api/address/Address';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

const addAddress = (data) => {
  console.log(`  Adding: ${data.address} (${data.owner})`);
  Addresses.collection.insert(data);
};
// Initialize the AddressesCollection if empty.
if (Addresses.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default address.');
    Meteor.settings.defaultData.forEach(data => addAddress(data));
  }
}
