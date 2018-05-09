const queryFilter = (arr, query) => {
  const queryKeys = Object.keys(query);
  let filteredArr = [...arr];
  if (queryKeys.length < 1) return arr;

  for (let i = 0; i < queryKeys.length; i++) {
    const key = queryKeys[i];
    const value = String(query[key]).toLowerCase();

    filteredArr = filteredArr.filter(item => {
      if (key === 'minheight') {
        return Number(item.height) >= Number(query[key]);
      }

      return String(item[key])
        .toLowerCase()
        .includes(value);
    });
  }
  return filteredArr;
};

module.exports = queryFilter;
