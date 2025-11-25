import Image from "next/image";
import SignImage from "@/public/IMG_EF92D81B2D49-1.jpeg";
import Link from "next/link";

const Academy = () => {
  return (
    <main>
      <section className="header bg-black p-5">
        <h1 className="md:font-bold md:text-2xl text-white">
          Welcome to Geenah’s Stitches Academy – Where Fashion Futures Begin
        </h1>
      </section>
      <section className="sign p-4">
        <div className="container m-auto h-60">
          <Image
            className={"h-full object-contain"}
            src={SignImage}
            alt={"signature"}
          />
        </div>
      </section>
      <section className="content p-4">
        <div className="container m-auto flex flex-col gap-10">
          <p>
            Geenah’s Stitches Academy is not just a private vocational school;
            it’s a gateway to unlocking creativity, mastering craftsmanship, and
            stepping confidently into the dynamic world of fashion. Dedicated to
            providing students with a comprehensive education, our academy is a
            nurturing ground where budding designers and fashion enthusiasts
            transform their passion into a thriving career.
          </p>
          <p>
            Our mission is clear and unwavering: to cultivate the next
            generation of fashion professionals by equipping them with the
            skills, knowledge, and creativity required to excel in the
            ever-evolving fashion industry. From the fundamentals of design and
            fabric selection to the intricacies of pattern-making, sewing
            techniques, and industry-standard finishing, our curriculum fosters
            innovation while building a strong foundation in fashion.
          </p>
          <p>
            At Geenah’s Stitches Academy, learning goes beyond the classroom. We
            emphasize hands-on experience, enabling students to work on
            real-world projects, gain confidence in their craft, and understand
            the business side of fashion design. Whether you’re dreaming of
            becoming a designer, starting your own brand, or simply exploring
            the art of fashion, our academy is committed to turning those dreams
            into reality.
          </p>

          <h1 className="text-xl font-bold">Upcoming Batch Details</h1>

          <p>
            We are thrilled to announce that the next batch at Geenah’s Stitches
            Academy will begin soon. Now is the perfect time to take the first
            step toward building your future in fashion design.
          </p>
        </div>
      </section>
      <section className="packages p-4">
        <div className="container m-auto p-4 flex flex-col md:flex-row md:flex-wrap gap-4 justify-between">
          <div className="consultation-card bg-red-100">
            <div className="content">
              <h2>BEGINNER CLASS</h2>
              <h4>6-MONTHS PERIOD</h4>
              <hr />
              <ul>
                <li>Introduction to Fashion Design</li>
                <li>Taking Accurate Measurements.</li>
                <li>Machine Operation and Handling.</li>
                <li>Textile and Fabric Knowledge.</li>
                <li>Fashion Sketching and Illustration.</li>
                <li>
                  Pattern drafting (Basic Body, Princess dart, Burstsier).
                </li>
                <li>
                  Constructing basic garments (Skirt, Blouse, Trouser, Sleeves).
                </li>
                <li>Sewing Techniques.</li>
                <li>
                  Creating Different Designs (bringing out creativity in you).
                </li>
                <li>Fashion Business Fundamentals.</li>
                <li>Practical and theory included in all course.</li>
              </ul>
            </div>
            <Link href="#">₦800000</Link>
          </div>

          <div className="consultation-card bg-green-100">
            <div className="content">
              <h2>UPGRADE CLASS</h2>
              <h4>3-MONTHS PERIOD</h4>
              <hr />
              <ul>
                <li>Introduction to Intermediate Course.</li>
                <li>Taking Accurate Measurements.</li>
                <li>Pattern Drafting.</li>
                <li>Zip Bulge Elimination.</li>
                <li>
                  Corsetry (Three parts cup Corset, Victorian Corset, Mesh
                  Corset – Victorian & Cup).
                </li>
                <li>Sewing Techniques.</li>
                <li>How to Cut a Perfect Mermaid Skirt.</li>
                <li>How to Create Designs.</li>
                <li>Beading and Embellishment.</li>
                <li>Business Class.</li>
                <li>
                  Practical and theoretical aspects are included in all courses.
                </li>
              </ul>
            </div>
            <Link href="#">₦600000</Link>
          </div>
          <div className="consultation-card bg-blue-100">
            <div className="content">
              <h2>ADVANCE CLASS</h2>
              <h4>1-MONTH PERIOD</h4>
              <hr />
              <ul>
                <li>Introduction to Advanced Course.</li>
                <li>Taking Accurate Measurements.</li>
                <li>Pattern drafting.</li>
                <li>
                  Corsetry (Victorian Corset, Three-part cup corset – Mesh).
                </li>
                <li>Sewing Techniques.</li>
                <li>Business Class.</li>
                <li>Practical and theoretical are included in all courses</li>
              </ul>
            </div>
            <Link href="#">₦300000</Link>
          </div>
        </div>
      </section>
      <section className="p-4">
        <div className="container p-4 m-auto flex gap-3 flex-col">
          <p>
            The program at Geenah’s Stitches Academy is designed to cater to
            different durations, allowing flexibility for our students.
            Additionally, there is a one-time <strong>Registration Fee</strong>{" "}
            of <strong>₦50,000</strong>.
          </p>
          <p>
            Our programs are designed to cater to various schedules, ensuring
            that you receive the best possible training at your own pace. With
            experienced instructors, a well-equipped learning environment, and a
            focus on personalized attention, we ensure that every student’s
            journey is unique and transformative.
          </p>
          <p>
            Don’t wait to start building the career you’ve always dreamed of.
            Join Geenah’s Stitches Academy and become part of a legacy of
            excellence in fashion education. Let’s design your future, one
            stitch at a time.
          </p>
          <p>
            Affordable student accommodation is available at an extra cost.{" "}
            <i>T&C apply.</i>
          </p>

          <strong className="p-5">
            <i>Certificate & Graduation on Completion</i>
          </strong>

          <h2 className="text-2xl font-bold">
            Your Fashion Journey Starts Here
          </h2>

          <p>
            Turn your passion for fashion into a rewarding career with Geenah’s
            Stitches Academy. Join our upcoming batch starting February 3rd and
            gain the skills, knowledge, and creativity needed to thrive in the
            fashion industry. With expert guidance and hands-on experience, your
            dream of becoming a fashion professional is just a step away.
          </p>

          <Link
            className="btn"
            href="https://paystack.shop/pay/geenahs-stitches-academy"
          >
            REGISTER NOW
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Academy;
