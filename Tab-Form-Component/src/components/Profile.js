import { useEffect, useState } from "react";

export default function Profile({ nextClickHandler, onChangeHandler, form }) {
  const [name, setName] = useState(form.name);
  const [email, setEmail] = useState(form.email);
  const [age, setAge] = useState(form.age);

  useEffect(() => {
    onChangeHandler({ name: name, email: email, age: age });
  }, [name, email, age]);
  return (
    <form className="form">
      <div className="form-row">
        <label>Name:</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label>Age:</label>
        <input
          type="number"
          required
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label>Email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="navigation-button">
        <button type="button" onClick={() => nextClickHandler(1)}>
          Next
        </button>
      </div>
    </form>
  );
}
