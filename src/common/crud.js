import initialData from '../initialData';

export const setData = (itemData = initialData) => {
  localStorage.setItem('itemData', JSON.stringify(itemData));
};

export const loadData = () => {
  const localStorageExists = localStorage.hasOwnProperty('itemData');
  if (!localStorageExists) setData();
  return JSON.parse(localStorage.getItem('itemData'));
};

export const deleteItem = (id, itemsList) => {
  const updatedList = itemsList.filter(item => item.id !== id);

  setData(updatedList);
};

export const addItem = (newItem, itemsList) => {
  const updatedList = [
    ...itemsList,
    newItem
  ];

  setData(updatedList);
};

export const updateItem = (updatedItem, itemsList) => {
  const updatedList = [...itemsList];
  const itemIndex = itemsList.findIndex(item => item.id === updatedItem.id);
  updatedList[itemIndex] = updatedItem;

  setData(updatedList);
};