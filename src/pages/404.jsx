import Link from "next/link";

const Custom404 = () => {
  return (
    <section className="py-5">
      <div className="container text-center py-5">
        <h1 className="fw-bold mb-3">404</h1>
        <p className="mb-4">The page you are looking for could not be found.</p>
        <Link href="/" className="theme_btn text-decoration-none">
          Go Home
        </Link>
      </div>
    </section>
  );
};

export default Custom404;
