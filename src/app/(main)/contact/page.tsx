import {
  BiLogoFacebookSquare,
  BiLogoInstagram,
  BiLogoWhatsapp,
} from "react-icons/bi";
import Link from "next/link";

const Contact = () => {
  return (
    <main className="bg-background-dark min-h-screen">
      <section className="bg-background-light text-basic py-20 px-10">
        <div className="container mx-auto">
          <h1 className="text-5xl font-black mb-4 tracking-tighter uppercase leading-none">Contact Us</h1>
          <p className="text-xl text-basic/50 italic font-medium max-w-xl">
             We&apos;re here to help you begin your journey to elegance and creativity.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 sm:px-10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="inline-block px-4 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                  Connection
                </div>
                <h2 className="text-5xl font-black text-basic uppercase tracking-tighter">Get In Touch</h2>
                <p className="text-muted leading-relaxed text-lg italic">
                  At Geenah’s Stitches, we value every connection. Whether you’re
                  looking to enroll in our academy, inquire about our bespoke
                  services, or simply learn more about what we do, we’re here to
                  assist you.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-12 pt-12 border-t border-background-dark">
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Head Office</h3>
                  <p className="text-basic font-medium leading-relaxed">
                    23 Adorlor Street by Patrick Ehimen, <br />
                    Off 1st Ugbor Benin city, <br />
                    Edo State. Nigeria
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Email</h3>
                    <p className="text-basic font-bold">hey@geenahsstitches.com</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Phone</h3>
                    <p className="text-basic font-bold">+234 705 673 0031</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Social Presence</h3>
                <ul className="social-links flex gap-6 text-3xl text-basic" aria-label="social links">
                  <li className="hover:text-primary transition-colors">
                    <Link href={"https://web.facebook.com/profile.php?id=100054223071005"} target={"_blank"}>
                      <BiLogoFacebookSquare />
                    </Link>
                  </li>
                  <li className="hover:text-primary transition-colors">
                    <Link href={"https://www.instagram.com/geenahs__stitches"} target={"_blank"}>
                      <BiLogoInstagram />
                    </Link>
                  </li>
                  <li className="hover:text-primary transition-colors">
                    <Link href={"https://api.whatsapp.com/send/?phone=2347056730031"} target={"_blank"}>
                      <BiLogoWhatsapp />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative group overflow-hidden bg-background border border-background-dark shadow-2xl p-4 aspect-square lg:aspect-auto h-full">
               <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1982.8731711671956!2d5.616427703810239!3d6.297026998649819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMTcnNDkuMyJOIDXCsDM3JzAzLjQiRQ!5e0!3m2!1sen!2sng!4v1763182299621!5m2!1sen!2sng"
                width="100%"
                height="100%"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0 grayscale hover:grayscale-0 transition-all duration-700"
              ></iframe>
              <div className="absolute inset-x-8 bottom-8 bg-background-light p-8 shadow-2xl">
                 <p className="text-basic text-xs font-bold uppercase tracking-widest text-center">Visit our Atelier</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
