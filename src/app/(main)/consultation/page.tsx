import Link from "next/link";
const Consultation = async () => {
  return (
    <main className="bg-background-dark min-h-screen">
      <section className="bg-background-light text-basic py-20 px-10">
        <div className="container mx-auto">
          <h1 className="text-5xl font-black mb-4 tracking-tighter uppercase leading-none">Consultation</h1>
          <p className="text-xl text-basic/50 italic font-medium max-w-xl">
             Our bespoke designs start with a conversation. Let&apos;s bring your vision to life.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 sm:px-10">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-6 text-basic">
            <div className="inline-block px-4 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
              Process
            </div>
            <h4 className="text-4xl font-black tracking-tighter uppercase">Thank You for Choosing Geenah’s Stitches</h4>
            <div className="grid md:grid-cols-2 gap-12 text-muted leading-relaxed">
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
            </div>
          </div>

          <div className="mt-28 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-basic uppercase tracking-tighter">Choose Your Plan</h2>
              <p className="text-muted italic max-w-2xl mx-auto font-medium">
                Our consultation plans are tailored to suit your specific needs, event type, and the urgency of your booking.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Standard */}
              <div className="group bg-background border border-background-dark p-10 flex flex-col justify-between hover:border-primary/30 transition-all shadow-2xl shadow-basic/5">
                <div className="space-y-6">
                  <div className="pb-6 border-b border-background-dark">
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-2">Standard</h2>
                    <h3 className="text-xl font-bold text-basic leading-tight">Vision & Project Planning</h3>
                  </div>
                  <ul className="space-y-4 text-sm text-muted">
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Discuss your vision & requirements</li>
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Define scope and establish timeline</li>
                  </ul>
                </div>
                <Link href="https://paystack.shop/pay/geenahsstitches-standard-consultation" 
                      className="mt-12 block py-5 bg-background-light text-basic text-center font-black uppercase text-xs tracking-widest hover:bg-primary transition-colors">
                  ₦35,000
                </Link>
              </div>

              {/* Premium */}
              <div className="group bg-background-light text-basic p-10 flex flex-col justify-between -translate-y-2 relative shadow-2xl shadow-primary/20">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 text-[8px] font-black uppercase tracking-widest">Most Popular</div>
                <div className="space-y-6">
                  <div className="pb-6 border-b border-white/10">
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-2">Premium</h2>
                    <h3 className="text-xl font-bold leading-tight">Style, Fabric & Fit</h3>
                  </div>
                  <ul className="space-y-4 text-sm text-basic/70">
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Personalized style assessment</li>
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Collaborative design process</li>
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Precise professional measurements</li>
                  </ul>
                </div>
                <Link href="https://paystack.shop/pay/geenahs-stitches-premium-consultation"
                      className="mt-12 block py-5 bg-primary text-basic text-center font-black uppercase text-xs tracking-widest hover:bg-white hover:text-basic transition-all">
                  ₦70,000
                </Link>
              </div>

              {/* Bridal */}
              <div className="group bg-background border border-background-dark p-10 flex flex-col justify-between hover:border-primary/30 transition-all shadow-2xl shadow-basic/5">
                <div className="space-y-6">
                  <div className="pb-6 border-b border-background-dark">
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-2">Bridal</h2>
                    <h3 className="text-xl font-bold text-basic leading-tight">Design & Accessories</h3>
                  </div>
                  <ul className="space-y-4 text-sm text-muted">
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Professional design sketching</li>
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Fabric selection & accessories guidance</li>
                    <li className="flex gap-3"><span className="text-primary font-bold">/</span> Comprehensive wedding timeline</li>
                  </ul>
                </div>
                <Link href="https://paystack.shop/pay/geenahs-stitches-bridal-consultation"
                      className="mt-12 block py-5 bg-background-light text-basic text-center font-black uppercase text-xs tracking-widest hover:bg-primary transition-colors">
                  ₦100,000
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-40 bg-background-dark border-t border-background-dark">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-12">
          <div className="space-y-4">
             <h4 className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">Quick Alternative</h4>
             <h2 className="text-5xl font-black text-basic uppercase tracking-tighter leading-none">Already Have a Design?</h2>
             <p className="text-muted italic max-w-2xl mx-auto leading-relaxed">
               If you’ve already envisioned your perfect piece, we’re ready to bring it to life. Contact us directly to share your design and start the crafting process.
             </p>
          </div>
          <Link href={"/contact"} className="inline-block px-12 py-5 bg-primary text-basic font-black uppercase text-xs tracking-[0.2em] hover:bg-background-light transition-all shadow-2xl shadow-primary/20">
            Send Your Vision
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Consultation;
