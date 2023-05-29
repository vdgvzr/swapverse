import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

export default function FormGroup({ children, name, text, error }) {
  return (
    <Form.Group className={`form-group ${error != null ? "error" : ""}`}>
      {name ? <Form.Label>{name}</Form.Label> : null}
      {children}
      {error != null && <div className="error-message">{error}</div>}
      {text ? <Form.Text className="text-muted">{text}</Form.Text> : null}
    </Form.Group>
  );
}

FormGroup.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string,
  text: PropTypes.string,
  error: PropTypes.string,
};
