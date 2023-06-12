import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

export default function Select({
  options,
  optionText,
  symbol,
  address,
  name,
  onChange,
}) {
  return (
    <Form.Select name={name} onChange={(e) => onChange(e.target.value)}>
      {optionText ? <option value="">Select a {optionText}</option> : null}
      {options.map((option) => {
        const value = address
          ? option.decimals + "-" + option.address
          : symbol
          ? option.symbol
          : option.id;

        return (
          <option value={value} key={symbol ? option.symbol : option.id}>
            {symbol ? option.symbol : option.name}
          </option>
        );
      })}
    </Form.Select>
  );
}

Select.propTypes = {
  options: PropTypes.array,
  optionText: PropTypes.string,
  symbol: PropTypes.bool,
  address: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
};
