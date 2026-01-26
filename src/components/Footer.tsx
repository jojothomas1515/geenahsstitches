import Link from "next/link";
import {
  FaApplePay,
  FaCcDiscover,
  FaCcMastercard,
  FaCcVisa,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="container flex flex-col md:flex-row text-white px-4 py-6 gap-5">
        <div className="get-in-touch flex flex-col gap-2 w-full md:w-1/2">
          <div className="w-full  relative after-before-bar mb-2">
            <h3>GET IN TOUCH</h3>
          </div>
          <div className="flex flex-col gap-2 text-gray-300 ">
            <div>
              <strong>Address:</strong>
              <span> {process.env.ADDRESS ? process.env.ADDRESS : ""}</span>
            </div>
            <div>
              <strong>Phone:</strong>
              <span> {process.env.PHONE ? process.env.PHONE : ""}</span>
            </div>
            <div>
              <strong>Email:</strong>
              <span> {process.env.EMAIL ? process.env.EMAIL : ""}</span>
            </div>
            <div
              aria-describedby="Opening Time Container"
              className="flex flex-col gap-0.5 font-extralight text-gray-400"
            >
              <i>Monday-Friday: 9am - 5pm</i>
              <i>Saturday: 9am - 2pm</i>
              <i>Sunday: Closed</i>
            </div>

            <div className="social-links flex flex-row gap-2 text-2xl">
              <Link
                href={
                  process.env.FACEBOOK_LINK ? process.env.FACEBOOK_LINK : "#"
                }
              >
                <FaFacebook />
              </Link>
              <Link
                href={
                  process.env.INSTAGRAM_LINK ? process.env.INSTAGRAM_LINK : "#"
                }
              >
                <FaInstagram />
              </Link>

              <Link
                href={process.env.TIKTOK_LINK ? process.env.TIKTOK_LINK : "#"}
              >
                <FaTiktok />
              </Link>
            </div>
          </div>
        </div>
        <div className="useful-links flex flex-col gap-2 w-full md:w-1/2">
          <div className="w-full  relative after-before-bar mb-2">
            <h3>USEFUL LINKS</h3>
          </div>
          <div className="flex flex-col gap-2 text-gray-300">
            <Link href={"/"}>Home</Link>
            <Link href={"/collections"}>Collections</Link>
            <Link href={"/academy"}>Our Academy</Link>
            <Link href={"/consultation"}>Consultation</Link>
          </div>
        </div>
      </div>
      <div className="border-gray-100 border-t text-white p-5 flex justify-between opacity-70">
        <div className="">&copy; GEENAH&apos;S STITCHES 2024</div>
        <div className="flex gap-2 text-2xl md:text-3xl">
          <FaCcVisa />
          <FaCcMastercard />
          <FaCcDiscover />
          <FaApplePay />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
