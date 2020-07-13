import React, { useState } from 'react';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import '../../styles/_modal.scss';
import errorIcon from '../../assets/error.svg';

import { addItem } from '../../common/crud';
import { onlySpaces } from '../../common/regex';

const AddItemForm = ({ openAddNewModal, setOpenAddNewModal, itemsList, fetchAndSetData }) => {
  const [itemName, setItemName] = useState('');
  const [itemSerialNumber, setItemSerialNumber] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = e => {
    if (e.target.name === 'itemName') setItemName(e.target.value);
    if (e.target.name === 'itemSerialNumber') setItemSerialNumber(e.target.value);
    if (e.target.name === 'itemPrice') setItemPrice(e.target.value);
  };

  const handleAddItem = e => {
    e.preventDefault();

    if (onlySpaces.test(itemName) || onlySpaces.test(itemSerialNumber) || onlySpaces.test(itemPrice)) {
      setErrorMsg('Input fields can\'t be empty.');
    } else {
      const lastItemIdInList = Math.max.apply(Math, itemsList.map(item => item.id));
      const newId = lastItemIdInList === -Infinity ? 1 : lastItemIdInList + 1;

      const newItem = {
        id: newId,
        name: itemName.trim(),
        serialNumber: itemSerialNumber,
        price: itemPrice
      };

      addItem(newItem, itemsList);
      fetchAndSetData();
      resetForm();
    }
  };

  const resetForm = () => {
    setItemName('');
    setItemSerialNumber('');
    setItemPrice('');
    setErrorMsg('');
    setOpenAddNewModal(false);
  };

  return (
    <Modal classNames={{ modal: 'modal' }} open={openAddNewModal} onClose={() => setOpenAddNewModal(false)} center>
      <h2 className='title'>Add New Item</h2>
      {errorMsg && <p className='error-message'><img src={errorIcon} alt='Error' /> {errorMsg}</p>}

      <form onSubmit={handleAddItem}>
        <label htmlFor='newArtist'>Name:</label>
        <input
          type='text'
          name='itemName'
          placeholder='Item Name'
          value={itemName}
          onChange={handleInputChange}
          required={true}
        />

        <label htmlFor='serialNumber'>Serial Number:</label>
        <input
          type='text'
          name='itemSerialNumber'
          placeholder='Serial Number'
          value={itemSerialNumber}
          onChange={handleInputChange}
          required={true}
        />

        <label htmlFor='price'>Value:</label>
        <input
          type='number'
          name='itemPrice'
          placeholder='Price'
          value={itemPrice}
          onChange={handleInputChange}
          required={true}
        />

        <button className='confirm' type='submit'>Confirm</button>
      </form>
      <button className='cancel' type='reset' onClick={() => setOpenAddNewModal(false)}>Cancel</button>
    </Modal>
  )
}

export default AddItemForm;