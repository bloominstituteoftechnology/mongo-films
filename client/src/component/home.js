import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>
        Hey I heard you might like buttons so I've added button to the button to
        the button.
      </h1>
      <Link to="/api/films">
        <button>
          Is button.<div>
            <button>
              Is another button.<div>
                <button>Go to the list of films</button>
              </div>
            </button>
          </div>
        </button>
      </Link>
    </div>
  );
};

export default Home;
