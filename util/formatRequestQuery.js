const ALLOWED_FILTERS = {
  Film: {
    producer: 'producer',
    director: 'director',
    released: 'release_date'
  }
};

const formatRequestQuery = (model, query) => {
  const keys = Object.keys(query);
  const values = Object.values(query);
  const filters = {};

  keys.forEach((x, i) => {
    let path = ALLOWED_FILTERS[model][x];
    if(path){
      filters[path] = {
        $regex: values[i],
        $options: 'i'
      }
    }
  });

  return filters;
}

module.exports = formatRequestQuery;