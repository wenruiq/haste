export const removeItemFromSaved = (savedItems, idToDelete) => {
  return savedItems.filter(item => item.id !== idToDelete);
};
