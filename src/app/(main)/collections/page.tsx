import Image from "next/image";
import Link from "next/link";
import { Package, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function CollectionsPage() {
  const collections = await prisma.collection.findMany({
    include: {
      products: {
        include: {
          productImages: true,
        },
        take: 3,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="bg-background-dark min-h-screen">
      <section className="header bg-basic text-white py-20 px-10">
        <div className="container mx-auto">
          <h1 className="text-5xl font-black mb-4 tracking-tighter uppercase">Our Collections</h1>
          <p className="text-xl text-white/70 italic font-medium max-w-2xl">
            Explore our curated selections of bespoke fashion, where every piece tells a story of elegance and tradition.
          </p>
        </div>
      </section>

      {collections.map((collection, index) => (
        <section key={collection.id} className={`py-40 ${index % 2 === 1 ? 'bg-background-dark' : 'bg-background'}`}>
          <div className="container mx-auto px-6 sm:px-10">
            <div className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-24 items-center`}>
              {/* Image Preview - Masonry Style */}
              <div className="lg:w-1/2 w-full group/gallery">
                <div className="relative">
                   <div className="absolute -inset-4 bg-primary/5 -z-10 blur-2xl opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-1000" />
                   <div className="grid grid-cols-2 gap-6">
                    {collection.products.length > 0 ? (
                      <>
                        <div className="aspect-3/4 relative border border-background-dark/50 overflow-hidden shadow-2xl shadow-basic/10">
                          {collection.products[0]?.productImages[0] ? (
                            <Image
                              src={collection.products[0].productImages[0].url}
                              alt={collection.products[0].name}
                              fill
                              className="object-cover group-hover/gallery:scale-110 transition-transform duration-[2s] ease-out"
                            />
                          ) : (
                            <div className="h-full w-full bg-background-light flex items-center justify-center text-muted">
                              <Package size={40} strokeWidth={1} />
                            </div>
                          )}
                        </div>
                        <div className="space-y-6">
                          <div className="aspect-square relative border border-background-dark/50 overflow-hidden shadow-xl shadow-basic/5">
                            {collection.products[1]?.productImages[0] ? (
                              <Image
                                src={collection.products[1].productImages[0].url}
                                alt={collection.products[1].name}
                                fill
                                className="object-cover group-hover/gallery:scale-105 transition-transform duration-[1.5s] ease-out"
                              />
                            ) : (
                              <div className="h-full w-full bg-background-light flex items-center justify-center text-muted">
                                <Package size={24} strokeWidth={1} />
                              </div>
                            )}
                          </div>
                          <div className="aspect-3/4 relative border border-background-dark/50 overflow-hidden shadow-2xl shadow-basic/10">
                            {collection.products[2]?.productImages[0] ? (
                              <Image
                                src={collection.products[2].productImages[0].url}
                                alt={collection.products[2].name}
                                fill
                                className="object-cover group-hover/gallery:scale-110 transition-transform duration-1000"
                              />
                            ) : (
                              <div className="h-full w-full bg-background-light flex items-center justify-center text-muted">
                                <Package size={24} strokeWidth={1} />
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="col-span-2 aspect-video bg-background-dark/10 border border-background-dark border-dashed flex flex-col items-center justify-center text-muted p-10 text-center">
                         <Package size={48} className="mb-4 opacity-20" />
                         <p className="italic font-medium uppercase text-[10px] tracking-widest">Coming Soon</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Info & CTA */}
              <div className="lg:w-1/2 space-y-12">
                <div className="space-y-6">
                   <div className="inline-flex items-center gap-3">
                      <div className="w-12 h-px bg-primary" />
                      <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em]">Collection {index + 1}</span>
                   </div>
                   <h2 className="text-6xl font-black text-basic leading-none tracking-tighter uppercase">{collection.name}</h2>
                   <p className="text-muted leading-relaxed text-xl font-medium italic max-w-lg">
                     &quot;{collection.description}&quot;
                   </p>
                </div>

                <div className="space-y-8">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-basic/30 flex items-center gap-4">
                     In this collection
                     <div className="flex-1 h-px bg-background-dark" />
                  </h3>
                  <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                     {collection.products.map(product => (
                       <div key={product.id} className="min-w-[120px] space-y-3 group/prod">
                         <div className="aspect-3/4 relative border border-background-dark overflow-hidden transition-all group-hover/prod:border-primary/50">
                            {product.productImages[0] && (
                              <Image src={product.productImages[0].url} alt={product.name} fill className="object-cover group-hover/prod:scale-110 transition-transform duration-700" />
                            )}
                         </div>
                         <p className="text-[8px] font-black truncate uppercase tracking-widest text-basic/60 group-hover/prod:text-primary transition-colors">{product.name}</p>
                       </div>
                     ))}
                  </div>
                </div>

                <Link 
                  href={`/collections/${collection.id}`} 
                  className="inline-flex items-center gap-6 px-12 py-5 bg-basic text-white font-black uppercase text-xs tracking-[0.2em] hover:bg-primary transition-all shadow-2xl shadow-primary/10 group"
                >
                  DISCOVER THE FULL SERIES
                  <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
