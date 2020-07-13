import React, { useState } from 'react';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import '../../styles/_modal.scss';
import errorIcon from '../../assets/error.svg';

import { updateItem } from '../../common/crud';
import { onlySpaces } from '../../common/regex';

const EditItem = ({ open, setOpen, info, itemsList, fetchAndSetData }) => {
  const { id, name, serialNumber, price } = info;
  const [ editItemName, setEditItemName ] = useState(name);
  const [ editItemSerialNumber, setEditItemSerialNumber ] = useState(serialNumber);
  const [ editItemPrice, setEditItemPrice ] = useState(price);
  const [ errorMsg, setErrorMsg ] = useState('');

  const handleInputChange = e => {
    if (e.target.name === 'editItemName') setEditItemName(e.target.value);
    if (e.target.name === 'editItemSerialNumber') setEditItemSerialNumber(e.target.value);
    if (e.target.name === 'editItemPrice') setEditItemPrice(e.target.value);
  };

  const handleEditItem = e => {
    e.preventDefault();
    
    if (onlySpaces.test(editItemName) || onlySpaces.test(editItemSerialNumber) || onlySpaces.test(editItemPrice)) {
      setErrorMsg('Input fields can\'t be empty');
    } else {
      const updatedItem = {
        id,
        name: editItemName.trim(),
        serialNumber: editItemSerialNumber,
        price: editItemPrice
      };

      updateItem(updatedItem, itemsList);
      fetchAndSetData();
      setOpen(false);
      setErrorMsg('');
    }
  };

  return (
    <Modal classNames={{ modal: 'modal' }} open={open} onClose={() => setOpen(false)} center>
      <h2 className='title'>Edit Item</h2>
      <h4>{name}</h4>
      {errorMsg && <p className='error-message'><img src={errorIcon} alt='Error' /> {errorMsg}</p>}

      <form onSubmit={handleEditItem}>
        <label htmlFor='id'>ID:</label>
        <input
          type='number'
          name='id'
          placeholder='ID'
          value={id}
          disabled={true}
        />

        <label htmlFor='editItemName'>Name:</label>
        <input
          type='text'
          name='editItemName'
          placeholder='item Name'
          value={editItemName}
          onChange={handleInputChange}
          required={true}
        />

        <label htmlFor='editItemSerialNumber'>Serial Number:</label>
        <input
          type='text'
          name='editItemSerialNumber'
          placeholder='Serial Number'
          value={editItemSerialNumber}
          onChange={handleInputChange}
          required={true}
        />

        <label htmlFor='editItemPrice'>Value ({'\u00A3'}):</label>
        <input
          type='number'
          name='editItemPrice'
          placeholder='Price'
          value={editItemPrice}
          onChange={handleInputChange}
          required={true}
        />
        <button className='confirm' type='submit'>Save changes</button>
      </form>
    </Modal>
  )
}

export default EditItem;