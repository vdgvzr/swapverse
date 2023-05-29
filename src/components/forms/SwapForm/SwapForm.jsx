import { Form } from "react-router-dom";
import { Form as BootstrapForm } from "react-bootstrap";
import FormGroup from "../FormGroup/FormGroup";
import Select from "../Select/Select";
import PropTypes from "prop-types";

export default function SwapForm({
  networks,
  tokens,
  handleChainChange,
  handleFromTokenChange,
  handleAmountChange,
  handleToTokenChange,
}) {
  return (
    <Form>
      <FormGroup name="Network">
        <Select
          name="network"
          options={networks}
          symbol={false}
          address={false}
          onChange={handleChainChange}
        />
      </FormGroup>
      <FormGroup name="From">
        <Select
          name="fromTokenAddress"
          options={tokens}
          optionText="token"
          symbol={true}
          address={true}
          onChange={handleFromTokenChange}
        />
        <BootstrapForm.Control
          type="number"
          placeholder="Enter amount"
          onChange={(e) => handleAmountChange(e)}
        />
      </FormGroup>
      <FormGroup name="To">
        <Select
          name="toTokenAddress"
          options={tokens}
          optionText="token"
          symbol={true}
          address={true}
          onChange={handleToTokenChange}
        />
      </FormGroup>
    </Form>
  );
}

SwapForm.propTypes = {
  networks: PropTypes.array,
  tokens: PropTypes.array,
  handleChainChange: PropTypes.func,
  handleFromTokenChange: PropTypes.func,
  handleAmountChange: PropTypes.func,
  handleToTokenChange: PropTypes.func,
};
