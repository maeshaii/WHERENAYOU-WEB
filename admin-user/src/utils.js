// utils.js

export const getBatchHeader = (users, viewList, selectedCourse, searchTerm) => {
  const batchUser = users.find(
    (user) =>
      user.type === viewList &&
      (selectedCourse === 'All' || user.course === selectedCourse) &&
      (searchTerm === '' || user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  return batchUser ? batchUser.batch : 'BATCH';
};

export const filterUsers = (users, viewList, selectedCourse, searchTerm) => {
  return users.filter(
    (user) =>
      user.type === viewList &&
      (selectedCourse === 'All' || user.course === selectedCourse) &&
      (searchTerm === '' || user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
};
