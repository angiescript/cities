import React from "react";
import { useHistory, useParams } from "react-router-dom";

const Placeholder = () => {
  const history = useHistory();
  const query = useParams().query;

  return (
    <div>
      <p>{query}</p>
      <button onClick={() => history.push("/")}>Back</button>
    </div>
  );
};

export default Placeholder;
