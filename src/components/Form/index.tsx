import { useState } from 'react';

type Props = {
  handleSearch: (value: string) => void;
}

export const Form = ({ handleSearch }: Props ) => {
  const [value, setValue] = useState('');
  const handleSubmit = () => handleSearch(value);
  const handleChange = (event: any) => {
    setValue(event.target.value)
  }

  return <form className="form">
    <input
      className="form-control"
      name='form-input'
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Text"
    />
    <button type="button" onClick={handleSubmit}>Search</button>
  </form>
}