import { useState } from "react";
import { Spinner } from "react-bootstrap";

const WebViewPage = ({ url }) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && (
        <div className="loader d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      )}
      <iframe
        src={url}
        style={{ width: "100%", height: "100vh", border: 0 }}
        onLoad={() => setLoading(false)}
      />
    </>
  );
};

export default WebViewPage;
