import Link from "next/link";
const Consultation = async () => {
  return (
    <main>
      <section className="header bg-black p-5">
        <h1 className="md:font-bold md:text-2xl text-white">Book an appointment</h1>
      </section>
      <section>
        <div className="container m-auto p-4 py-8 text-[#312e39]">
          <h4 className="text-xl font-bold mb-3">Thank You for Choosing Geenah’s Stitches</h4>
          <p className="mb-3">
            We’re thrilled that you’re interested in creating magic with us! To
            ensure we bring your vision to life seamlessly, a consultation is
            required before placing an order. This allows us to discuss your
            designs, fabric choices, and measurements in detail.
          </p>
          <p className="mb-3">
            If you’re unsure of the design you want, we recommend booking an
            appointment to explore ideas and create something unique together.
            However, if you already have a design in mind, simply contact us and
            provide the details so we can bring your vision to reality.
          </p>

          <h4 className="text-xl font-bold mb-3 mt-5">Choose Your Consultation Type</h4>
          <p>
            Our consultation plans are tailored to suit your specific needs,
            event type, and the urgency of your booking. Select the plan that
            best aligns with your vision:
          </p>
        </div>
      </section>
      <section className="package">
        <div className="container p-4 flex gap-5 justify-between m-auto flex-wrap">
          <div className="consultation-card">
           <div className="content"> <h2>STANDARD</h2>
            <h4>Vision and project planning.</h4>
            <hr />
            <ul>
              <li>Discuss your vision, preferences, and requirements.</li>
              <li>Define the scope of the project and establish a timeline.</li>
            </ul></div>
            <Link href="https://paystack.shop/pay/geenahsstitches-standard-consultation">
              ₦35000
            </Link>
          </div>
          <div className="consultation-card">
            <div className="content"><h2>PREMIUM</h2>
            <h4>Style, fabric, and fit.</h4>
            <hr />
            <ul>
              <li>
                Personalized style assessment, recommendations, and advice.
              </li>
              <li>Fabric selection and a collaborative design process.</li>
              <li>Measurements to ensure a perfect fit.</li>
            </ul></div>
            <Link href="https://paystack.shop/pay/geenahs-stitches-premium-consultation">
              ₦70000
            </Link>
          </div>
          <div className="consultation-card">
            <div className="content">
              <h2>BRIDAL CONSULTATION</h2>
              <h4>Custom design and accessories.</h4>
              <hr />
              <ul>
                <li>Discuss your vision, preferences, and requirements.</li>
                <li>Professional sketching of your design.</li>
                <li>Budget and timeline planning.</li>
                <li>Collaborative design process and fabric selection.</li>
                <li>
                  Guidance on accessories, including veils, jewelry, and shoes.
                </li>
              </ul>
            </div>
            <Link href="https://paystack.shop/pay/geenahs-stitches-bridal-consultation">
              ₦100000
            </Link>
          </div>
        </div>
      </section>

      <section className="contact-us mb-5 ">
        <div className="container p-4 m-auto text-[#312e39] flex flex-col justify-center  gap-8 h-[80dvh]">
          <h4 className="text-xs font-bold text-center ">
            CONTACT US
          </h4>
          <h2 className="font-bold text-3xl md:text-4xl text-center" >Already Have a Design?</h2>
          <p className="text-center">If you’ve already envisioned your perfect design, we’re here to bring it to life. Simply contact us and share your design details, and we’ll ensure every detail is crafted to perfection.</p>
          <Link href={"/contact"} className="w-max self-center bg-black text-gray-50 p-4 py-2 cursor-pointer transition-colors hover:bg-white hover:text-black">CONTACT US</Link>
        </div>
      </section>
    </main>
  );
};

export default Consultation;
