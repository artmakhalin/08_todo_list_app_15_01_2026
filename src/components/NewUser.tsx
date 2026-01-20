import { useState, type FC } from "react";
import { v4 } from "uuid";
import type { IUser } from "../utils/constants.";

interface IProps {
  addUser: (newUser: IUser) => void;
}

const NewUser: FC<IProps> = ({ addUser }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedPhone || !trimmedEmail) {
      return;
    }

    addUser({
      id: v4(),
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
    });

    setName("");
    setPhone("");
    setEmail("");
  };
  return (
    <div className="toolbar">
      <label className="toolbar__field toolbar__field--grow">
        <span className="toolbar__label">Name</span>
        <input
          className="toolbar__control"
          type="text"
          placeholder="Enter name.."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="toolbar__field">
        <span className="toolbar__label">Email</span>
        <input
          className="toolbar__control"
          value={email}
          type="email"
          placeholder="Enter email.."
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="toolbar__field">
        <span className="toolbar__label">Phone</span>
        <input
          className="toolbar__control"
          value={phone}
          type="phone"
          placeholder="Enter phone.."
          onChange={(e) => setPhone(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        />
      </label>
      <button
        className="toolbar__btn"
        onClick={onSubmit}
        disabled={!name.trim() || !email.trim() || !phone.trim()}
      >
        Add
      </button>
    </div>
  );
};

export default NewUser;
