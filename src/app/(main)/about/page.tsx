import Image from "next/image";
import Link from "next/link";
import Image1 from "@/public/IMG_4673.jpg";
import QuoteIcon from "@/public/quote.png";

import { FaFacebookSquare, FaInstagramSquare, FaTiktok } from "react-icons/fa";

const About = () => {
  return (
    <main className="bg-background-dark min-h-screen text-basic">
      {/* Hero Section */}
      <section className="bg-basic text-white py-40 px-6 sm:px-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-primary/20 -skew-x-12 translate-x-1/2 opacity-50" />
        <div className="container mx-auto relative">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-4">
              <div className="w-12 h-px bg-primary" />
              <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em]">Our Story</span>
            </div>
            <h1 className="text-7xl sm:text-9xl font-black tracking-tighter uppercase leading-[0.85]">Where <br /> Elegance Meets <br /> <span className="text-primary">Artistry</span></h1>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-32 px-6 sm:px-10">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 relative">
               <div className="absolute -inset-4 bg-primary/5 -z-10 blur-3xl" />
               <div className="relative aspect-3/4 border border-background-dark overflow-hidden shadow-2xl group">
                 <Image 
                   src={Image1} 
                   alt="Regina Thomas" 
                   fill 
                   className="object-cover group-hover:scale-105 transition-transform duration-[2s]" 
                 />
                 <div className="absolute inset-0 bg-linear-to-t from-basic via-transparent to-transparent opacity-60" />
                 <div className="absolute bottom-10 left-10 space-y-1">
                   <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Regina Thomas</h2>
                   <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Lead Designer & Visionary</p>
                 </div>
               </div>
               
               <div className="absolute -bottom-6 -right-6 flex gap-4 text-3xl bg-background p-6 shadow-2xl border border-background-dark">
                  <Link href="https://www.instagram.com/geenahs__stitches/" className="hover:text-primary transition-colors"><FaInstagramSquare /></Link>
                  <Link href="https://web.facebook.com/profile.php?id=100054223071005" className="hover:text-primary transition-colors"><FaFacebookSquare /></Link>
                  <Link href="https://www.tiktok.com/@geenahs_stitches" className="hover:text-primary transition-colors"><FaTiktok /></Link>
               </div>
            </div>

            <div className="lg:w-1/2 space-y-12">
              <div className="space-y-6">
                 <h3 className="text-4xl font-black text-basic uppercase tracking-tighter leading-none">A Journey of <br /> Perfection</h3>
                 <div className="space-y-6 text-muted text-lg leading-relaxed italic border-l-4 border-primary/20 pl-8">
                    <p>
                      At Geenah’s Stitches, we are more than just a bespoke fashion
                      house – we are storytellers weaving elegance, sophistication, and
                      individuality into every stitch.
                    </p>
                    <p>
                      Since starting our journey in 2015, we have become renowned for our unparalleled craftsmanship,
                      specializing in creating one-of-a-kind luxury dresses that
                      transcend trends and celebrate timeless beauty.
                    </p>
                 </div>
              </div>
              
              <div className="p-10 bg-background border border-background-dark relative">
                <Image src={QuoteIcon} alt="Quote" width={30} height={30} className="absolute -top-4 -left-4 opacity-20" />
                <p className="text-basic text-xl font-medium leading-relaxed italic">
                  &quot;Fashion is the silent language of confidence, a canvas where individuality meets timeless elegance.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values / Philosophy */}
      <section className="py-40 bg-background-dark border-t border-background-dark">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20">
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.5em] text-primary">The Philosophy</h3>
              <p className="text-3xl font-black text-basic uppercase tracking-tighter leading-tight">
                Every garment we create is a masterpiece, designed to reflect the essence of you.
              </p>
            </div>
            <div className="space-y-8 text-muted leading-relaxed">
               <p>
                At the heart of Geenah’s Stitches is an unwavering commitment to
                excellence. Every fabric, embellishment, and silhouette is carefully
                curated to elevate your experience, making you feel as exceptional
                as the dress you wear.
              </p>
              <p>
                Whether it’s an enchanting gown for a red-carpet moment, a wedding dress for your most cherished day, or
                an elegant ensemble for an unforgettable occasion, we promise to
                bring your vision to life with unmatched finesse.
              </p>
              <div className="h-px w-20 bg-primary" />
              <p className="text-basic font-bold uppercase tracking-widest text-[10px]">
                Because at Geenah’s Stitches, every woman deserves to wear a dress as remarkable as she is.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
