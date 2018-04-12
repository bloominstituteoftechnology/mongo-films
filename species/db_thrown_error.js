const db_thrown_error = err => {
  if (err === undefined) return `provide an error object to parse!`; // check if an object was supplied
  switch (err.type) {
    case `GET`:
      if (err.error !== undefined) {
        return {
          errorMessage: `No results!. Internal server error. ${err.error}`,
          status: 500,
        };
      }

    case `POST`:
      if (err.error !== undefined) {
        return {
          errorMessage: `Species not created!. Internal server error. ${
            err.error
          }`,
          status: 500,
        };
      }

    case `DELETE`:
      if (err.error !== undefined && typeof err.error === `object`) {
        if (err.error.name === 'CastError') {
          return {
            errorMessage: `The id provided is invalid, please check and try again. ${
              err.error
            }`,
            status: 400,
          };
        } else {
          return {
            errorMessage: `Species could not be deleted. Internal server error. ${
              err.error
            }`,
            status: 500,
          };
        }
      } // only check if err.error is an object
    case 'PUT':
      if (err.error !== undefined && typeof err.error === `object`) {
        if (err.error.name === `CastError`) {
          return {
            errorMessage: `The id provided is invalid, please check and try again. ${
              err.error
            }`,
            status: 400,
          };
        } else {
          return {
            errorMessage: `Species not updated. Internal server error. ${
              err.error
            }`,
            status: 500,
          };
        }
      } // only check if err.error is an object
    default:
      return {
        errorMessage: `Internal server error ${err.error}`,
        status: 500,
      };
  }
};

module.exports = db_thrown_error;
