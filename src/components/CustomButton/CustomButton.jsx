import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

export default function CustomButton({ buttonText, type }) {
  return (
    <Button className="custom-button" type={type}>
      {buttonText}
    </Button>
  );
}

CustomButton.propTypes = {
  buttonText: PropTypes.string,
  type: PropTypes.string,
};
