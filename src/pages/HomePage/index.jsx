import React, { useState, useEffect } from 'react';
import CsvDownload from 'react-json-to-csv'

import './styles.scss';

import { loadData } from '../../common/crud';

import AddItemForm from '../../components/AddItemForm';
import ItemList from '../../components/ItemList';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [openAddNewModal, setOpenAddNewModal] = useState(false);

  useEffect(() => {
    fetchAndSetData();
  }, []);

  const fetchAndSetData = () => {
    const response = loadData();
    setItems(response);
  };


  return (
    <>
      <header>
        <h1>My Inventory</h1>
        <div className="actions">
          <span className='add-new' onClick={() => setOpenAddNewModal(true)}>Add New Item</span>
          <CsvDownload
            data={items}
            filename="inventory.csv"
            style={{
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: '15px',
              outline: 'none',
              padding: '5px 10px',
              fontSize: '14px',
              marginRight: '10px',
              backgroundColor: 'rgb(204, 204, 204)'
            }}>Export</CsvDownload>
        </div>
      </header>

      {openAddNewModal ?
        <AddItemForm  
          openAddNewModal={openAddNewModal}
          setOpenAddNewModal={setOpenAddNewModal}
          itemsList={items}
          fetchAndSetData={fetchAndSetData}
        />
        :
        null
      }

      <ItemList
        itemsList={items}
        fetchAndSetData={fetchAndSetData}
      />
    </>
  )
}

export default HomePage;