import PropTypes from 'prop-types';
import { Label, Input } from './Filter.styled';

export const Filter = ({ onInputChange }) => {
  return (
    <Label>
      find contacts by name
      <Input type="text" onChange={e => onInputChange(e.target.value)} />
    </Label>
  );
};

Filter.propTypes = {
  onInputChange: PropTypes.func.isRequired,
};
