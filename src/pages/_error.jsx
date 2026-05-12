import Error from "next/error";

const CustomError = ({ statusCode }) => {
  return <Error statusCode={statusCode} />;
};

CustomError.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || 500;

  return { statusCode };
};

export default CustomError;
