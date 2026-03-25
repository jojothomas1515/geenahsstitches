import Link from "next/link";
import {
  FaApplePay,
  FaCcDiscover,
  FaCcMastercard,
  FaCcVisa,
  FaFacebook,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-background-dark pt-16 pb-8 border-t border-background-light">
      <div className="container mx-auto px-4 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & About */}
          <div className="space-y-6 flex flex-col items-start text-left">
            <h3 className="text-2xl font-black text-basic tracking-tighter uppercase">Geenah&apos;s Stitches</h3>
            <p className="text-muted leading-relaxed text-sm">
              Discover unique styles and the latest trends tailored exclusively for you. Quality stitching meets modern fashion.
            </p>
            <div className="flex gap-4">
              <Link href={process.env.NEXT_PUBLIC_FACEBOOK_LINK || "#"} className="p-2 rounded-full bg-background text-muted hover:text-primary hover:bg-primary/10 transition-colors">
                <FaFacebook size={18} />
              </Link>
              <Link href={process.env.NEXT_PUBLIC_INSTAGRAM_LINK || "#"} className="p-2 rounded-full bg-background text-muted hover:text-primary hover:bg-primary/10 transition-colors">
                <FaInstagram size={18} />
              </Link>
              <Link href={process.env.NEXT_PUBLIC_TIKTOK_LINK || "#"} className="p-2 rounded-full bg-background text-muted hover:text-primary hover:bg-primary/10 transition-colors">
                <FaTiktok size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-basic uppercase tracking-widest">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-muted text-sm hover:text-primary hover:-translate-y-0.5 transition-all inline-block w-fit">Home</Link>
              <Link href="/collections" className="text-muted text-sm hover:text-primary hover:-translate-y-0.5 transition-all inline-block w-fit">Collections</Link>
              <Link href="/academy" className="text-muted text-sm hover:text-primary hover:-translate-y-0.5 transition-all inline-block w-fit">Our Academy</Link>
              <Link href="/consultation" className="text-muted text-sm hover:text-primary hover:-translate-y-0.5 transition-all inline-block w-fit">Consultation</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-basic uppercase tracking-widest">Get In Touch</h4>
            <div className="space-y-4 text-sm text-muted">
              <div>
                <strong className="block text-basic mb-1 text-xs uppercase tracking-widest">Address:</strong>
                <span>{process.env.NEXT_PUBLIC_ADDRESS || "Lagos, Nigeria"}</span>
              </div>
              <div>
                <strong className="block text-basic mb-1 text-xs uppercase tracking-widest">Phone:</strong>
                <span>{process.env.NEXT_PUBLIC_PHONE || "+234 800 000 0000"}</span>
              </div>
              <div>
                <strong className="block text-basic mb-1 text-xs uppercase tracking-widest">Email:</strong>
                <span>{process.env.NEXT_PUBLIC_EMAIL || "info@geenahsstitches.com"}</span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-basic uppercase tracking-widest">Opening Hours</h4>
            <div className="space-y-3 text-sm text-muted">
              <div className="flex justify-between border-b border-background pb-2">
                <span>Mon - Fri</span>
                <span className="text-basic font-medium">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-background pb-2">
                <span>Saturday</span>
                <span className="text-basic font-medium">9:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between pb-2">
                <span>Sunday</span>
                <span className="text-primary font-medium uppercase text-xs tracking-wider">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-background-light gap-4">
          <p className="text-xs text-muted font-medium">
            &copy; {new Date().getFullYear()} GEENAH&apos;S STITCHES. All rights reserved.
          </p>
          <div className="flex gap-3 text-2xl text-muted">
            <FaCcVisa className="hover:text-basic transition-colors cursor-pointer" />
            <FaCcMastercard className="hover:text-basic transition-colors cursor-pointer" />
            <FaCcDiscover className="hover:text-basic transition-colors cursor-pointer" />
            <FaApplePay className="hover:text-basic transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
