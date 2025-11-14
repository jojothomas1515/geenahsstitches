import Link from "next/link";
const Consultation = async () => {
  return (
    <main>
      <section className="header bg-black p-5">
        <h1 className="md:font-bold md:text-2xl text-white">Book an appointment</h1>
      </section>
      <section>
        <div className="container m-auto p-4">
          <h4>Thank You for Choosing Geenah’s Stitches</h4>
          <p>
            We’re thrilled that you’re interested in creating magic with us! To
            ensure we bring your vision to life seamlessly, a consultation is
            required before placing an order. This allows us to discuss your
            designs, fabric choices, and measurements in detail.
          </p>
          <p>
            If you’re unsure of the design you want, we recommend booking an
            appointment to explore ideas and create something unique together.
            However, if you already have a design in mind, simply contact us and
            provide the details so we can bring your vision to reality.
          </p>

          <h4>Choose Your Consultation Type</h4>
          <p>
            Our consultation plans are tailored to suit your specific needs,
            event type, and the urgency of your booking. Select the plan that
            best aligns with your vision:
          </p>
        </div>
      </section>
      <section className="package">
        <div className="container p-4 flex gap-5 justify-center-safe m-auto flex-wrap">
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
    </main>
  );
};

export default Consultation;
