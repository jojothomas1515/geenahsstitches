const Contact = () => {
  return (
    <main>
      <section className="header bg-black p-5">
        <h1 className="md:font-bold md:text-2xl text-white">Contact Us</h1>
      </section>
      <section className="get-in-touch p-4">
        <div className="container flex flex-col md:flex-row p-4 gap-4">
          <div>
            <h1 className="text-xl font-bold mb-3">Get In Touch</h1>
            <p>
              At Geenah’s Stitches, we value every connection. Whether you’re
              looking to enroll in our academy, inquire about our bespoke
              services, or simply learn more about what we do, we’re here to
              assist you. Reach out today, and let’s begin your journey to
              elegance and creativity.
            </p>
          </div>
          <div className="md:w-1/2">
            <h1 className="text-xl font-bold mb-3">Social Media</h1>
            <ul className="social-links" aria-label="social links">
                <li aria-label="social link"></li>
            </ul>
          </div>
        </div>
      </section>
      <section className="location-info p-4">
        <div className="containter flex-col md:flex-row gap-4 m-auto justify-between p-4">
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className=""
              height={"2rem"}
              width={"2rem"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <div className="info">
              <h2 className="font-bold text-xl ">Head Office</h2>
              <p className="">
                23 Adorlor Street by Patrick Ehimen, Off 1st Ugbor Benin city,
                Edo State. Nigeria
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={"2rem"}
              width={"2rem"}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            <div>
              <h2 className="font-bold text-xl">Phone</h2>
              <p>+234 705 673 0031</p>
            </div>
          </div>
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              height={"2rem"}
              width="2rem"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <div>
              <h2 className="font-bold text-xl">Email</h2>
              <p>hey@heygeenahsstitches.com</p>
            </div>
          </div>
        </div>
      </section>
      <section className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1982.8731711671956!2d5.616427703810239!3d6.297026998649819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMTcnNDkuMyJOIDXCsDM3JzAzLjQiRQ!5e0!3m2!1sen!2sng!4v1763182299621!5m2!1sen!2sng"
          width="800"
          height="600"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="border-0 m-auto w-full p-4"
        ></iframe>
      </section>
    </main>
  );
};

export default Contact;
