import Link from "next/link";
import DonationCard from "../CommonCard/DonationCard";

const Footer = () => {
  return (
    <section className="footer_section text-center">
      <DonationCard />
      <div className="footerContent">
        <h4 className="text-white fw-bold mb-3">Public Primary</h4>
        <p className="lg-mb-4">
          Every vote begins with awareness. Our platform helps you explore every
          constituency — from the national stage to your local district.
        </p>

        <ul className="footerLinks my-4 p-0 d-flex align-items-center gap-5 justify-content-center">
          <li>
            <Link href="/constituencies">Constituencies</Link>
          </li>
          <li>
            <Link href="/privacypolicy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/termsandconditions">Terms & Conditions</Link>
          </li>
        </ul>

        <p className="m-0">
          © <Link href="/termsandconditions">Primary Public</Link> all rights
          Reserved
        </p>
      </div>
    </section>
  );
};

export default Footer;
