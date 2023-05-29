import { useRouteError } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

export default function ErrorPage() {
  const error = useRouteError();

  console.log(error);

  const preStyle = { whiteSpace: "pre-wrap" };

  return (
    <>
      <Row>
        <Col>
          <h1>Error - Something went wrong</h1>
          {import.meta.env.MODE !== "production" && (
            <>
              <pre style={preStyle}>{error.message}</pre>
              <pre style={preStyle}>{error.stack}</pre>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
