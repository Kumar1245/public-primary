import Link from "next/link";

const Custom500 = () => {
  return (
    <section className="py-5">
      <div className="container text-center py-5">
        <h1 className="fw-bold mb-3">500</h1>
        <p className="mb-4">Something went wrong. Please try refreshing the page.</p>
        <Link href="/" className="theme_btn text-decoration-none">
          Go Home
        </Link>
      </div>
    </section>
  );
};

export default Custom500;
