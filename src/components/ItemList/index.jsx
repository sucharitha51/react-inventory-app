import React from 'react';

import './styles.scss';

import Item from '../Item'

const ItemsList = ({ itemsList, fetchAndSetData }) => {
  return (
    <div className='items-list'>
      <div className='columns'>
        <p className='id'>#</p>
        <p className='name'>Name</p>
        <p className='serialNumber'>Serial Number</p>
        <p className='price'>Value</p>
      </div>

      {itemsList && itemsList.length === 0 ?
        <p>No data.</p>
        :
        itemsList && itemsList.map(item => (
          <Item
            key={item.id}
            info={item}
            itemsList={itemsList}
            fetchAndSetData={fetchAndSetData}
          />
        ))
      }
    </div>
  )
}

export default ItemsList;