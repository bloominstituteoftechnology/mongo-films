// {producer: {$regex: 'gary kurtz' , $options: 'i'}}

const getFilters = (query) => {
  const keys = Object.keys(query);
  const values = Object.values(query);
  const filters = {};

  keys.forEach((x, i) => {
    filters[x] = {
      $regex: values[i],
      $options: 'i'
    }
  });

  return filters;
}