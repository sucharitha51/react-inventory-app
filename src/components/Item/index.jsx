import React, { useState } from 'react';
import './styles.scss';

import { deleteItem } from '../../common/crud';
import EditItemForm from '../EditItemForm';

import penIcon from '../../assets/pen.svg';
import trashIcon from '../../assets/trash.svg';

const Item = ({ info, itemsList, fetchAndSetData }) => {
  const { id, name, serialNumber, price } = info;
  const [openModal, setOpenModal] = useState(false);

  const handleItemDelete = id => {
    if (window.confirm(`Are you sure you want to delete "${name} - ${serialNumber}"?`)) {
      deleteItem(id, itemsList);
      fetchAndSetData();
    };
    return;
  }


  return (
    <div className='item'>
      <p className='id'>{id}</p>
      <p className='name'>{name}</p>
      <p className='serialNumber'>{serialNumber}</p>
      <p className='price' >{'\u00A3'}{price}</p>
      <div className='actions'>
        <img src={penIcon} alt='Edit' onClick={() => setOpenModal(true)} />
        <img src={trashIcon} alt='Delete' onClick={() => handleItemDelete(id)} />
      </div>

      {openModal ?
        <EditItemForm
          open={openModal}
          setOpen={setOpenModal}
          info={info}
          itemsList={itemsList}
          fetchAndSetData={fetchAndSetData}
        />
        :
        null
      }
    </div>
  )
}

export default Item;