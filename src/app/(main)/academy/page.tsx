import Image from "next/image";
import SignImage from "@/public/IMG_EF92D81B2D49-1.jpeg";
import Link from "next/link";

const Academy = () => {
  return (
    <main className="bg-background-dark min-h-screen">
      <section className="bg-background-light text-basic py-20 px-10">
        <div className="container mx-auto">
          <h1 className="text-5xl font-black mb-4 tracking-tighter uppercase leading-none">Academy</h1>
          <p className="text-xl text-basic/50 italic font-medium max-w-xl">
             Where Fashion Futures Begin. Master the art of couture with expert guidance.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 sm:px-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative group overflow-hidden border border-background-dark shadow-2xl">
              <Image
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                src={SignImage}
                alt="Academy Signature"
              />
              <div className="absolute inset-x-8 bottom-8 bg-background-light/90 backdrop-blur-md p-6 border border-white/10">
                 <p className="text-basic text-[10px] font-black uppercase tracking-[0.4em] text-center">Excellence in Craft</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="inline-block px-4 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                Philosophy
              </div>
              <h2 className="text-5xl font-black text-basic uppercase tracking-tighter leading-tight">Master the Art <br /> of Couture</h2>
              <div className="space-y-6 text-muted text-lg leading-relaxed italic border-l-4 border-primary/20 pl-8">
                <p>
                  Geenah’s Stitches Academy is a gateway to unlocking creativity, mastering craftsmanship, and
                  stepping confidently into the dynamic world of fashion.
                </p>
                <p>
                  Our mission is to cultivate the next generation of fashion professionals by equipping them with the
                  skills, knowledge, and creativity required to excel in the ever-evolving industry.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-40 space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-basic uppercase tracking-tighter">Curriculum & Programs</h2>
              <p className="text-muted italic max-w-2xl mx-auto font-medium">
                Comprehensive training modules designed for every stage of your fashion journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Beginner */}
              <div className="group bg-background border border-background-dark p-10 flex flex-col justify-between hover:border-primary/50 transition-all shadow-2xl shadow-basic/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 -rotate-45 translate-x-10 -translate-y-10" />
                <div className="space-y-6">
                  <div className="pb-6 border-b border-background-dark">
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-2">Beginner</h2>
                    <h3 className="text-xl font-bold text-basic leading-tight">Foundation Class</h3>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-2">6 Months Duration</p>
                  </div>
                  <ul className="space-y-3 text-sm text-muted">
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Fashion Design Fundamentals</li>
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Accurate Measurements</li>
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Pattern Drafting & Sketching</li>
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Basic Garment Construction</li>
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Machine Operation</li>
                  </ul>
                </div>
                <div className="mt-12 pt-8 border-t border-background-dark">
                   <p className="text-2xl font-black text-basic">₦800,000</p>
                   <p className="text-[10px] text-muted uppercase font-bold tracking-widest mt-1">Full Certification</p>
                </div>
              </div>

              {/* Upgrade */}
              <div className="group bg-background-light text-basic p-10 flex flex-col justify-between -translate-y-2 relative shadow-2xl shadow-primary/20">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 -rotate-45 translate-x-12 -translate-y-12" />
                <div className="space-y-6">
                  <div className="pb-6 border-b border-white/10">
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-2">Upgrade</h2>
                    <h3 className="text-xl font-bold leading-tight">Intermediate Mastery</h3>
                    <p className="text-[10px] font-bold text-basic/40 uppercase tracking-widest mt-2">3 Months Duration</p>
                  </div>
                  <ul className="space-y-3 text-sm text-basic/70">
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Advanced Pattern Drafting</li>
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Specialized Corsetry Techniques</li>
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Mermaid Silhouette Perfection</li>
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Beading & Embellishments</li>
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Custom Creation Process</li>
                  </ul>
                </div>
                <div className="mt-12 pt-8 border-t border-white/10">
                   <p className="text-2xl font-black text-basic">₦600,000</p>
                   <p className="text-[10px] text-basic/40 uppercase font-bold tracking-widest mt-1">Skill Elevation</p>
                </div>
              </div>

              {/* Advance */}
              <div className="group bg-background border border-background-dark p-10 flex flex-col justify-between hover:border-primary/50 transition-all shadow-2xl shadow-basic/5 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 -rotate-45 translate-x-10 -translate-y-10" />
                 <div className="space-y-6">
                  <div className="pb-6 border-b border-background-dark">
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-2">Advanced</h2>
                    <h3 className="text-xl font-bold text-basic leading-tight">Master Class</h3>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest mt-2">1 Month Period</p>
                  </div>
                  <ul className="space-y-3 text-sm text-muted">
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> High-End Corsetry & Structure</li>
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Advanced Pattern Manipulations</li>
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Couture Finishing Techniques</li>
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Fashion Business Strategy</li>
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Portfolio Refinement</li>
                  </ul>
                </div>
                <div className="mt-12 pt-8 border-t border-background-dark">
                   <p className="text-2xl font-black text-basic">₦300,000</p>
                   <p className="text-[10px] text-muted uppercase font-bold tracking-widest mt-1">Couture Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-40 bg-background-dark border-t border-background-dark">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-12">
          <div className="space-y-4">
             <h4 className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">Enroll Now</h4>
             <h2 className="text-5xl font-black text-basic uppercase tracking-tighter leading-tight">Your Fashion Journey Begins February 3rd</h2>
             <p className="text-muted italic max-w-2xl mx-auto leading-relaxed">
               Turn your passion into a rewarding career. Join our upcoming batch and gain the skills needed to thrive in the world of high-fashion.
             </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="https://paystack.shop/pay/geenahs-stitches-academy" className="px-12 py-5 bg-primary text-basic font-black uppercase text-xs tracking-[0.2em] hover:bg-background-light transition-all shadow-2xl shadow-primary/20">
              Register Now
            </Link>
            <p className="text-[10px] text-muted font-bold uppercase tracking-widest">
              Registration Fee: ₦50,000 <br />
              Accommodation Available
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Academy;
