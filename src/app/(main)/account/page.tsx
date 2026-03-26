import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { 
  Package, 
  User, 
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  PackageCheck,
  Search,
  ArrowRight
} from "lucide-react";
import OrderStatusBadge from "@/components/dashboard/admin/orders/OrderStatusBadge";
import { OrderStatus } from "@/generated/prisma/enums";

// --- Logic for steps ---
const getSteps = (status: OrderStatus) => {
  const allSteps = [
    { name: "Ordered", icon: Clock },
    { name: "Processing", icon: Package },
    { name: "Shipped", icon: Truck },
    { name: "Delivered", icon: CheckCircle2 },
  ];

  const statusPriority: Record<OrderStatus, number> = {
    PENDING: 1,
    PROCESSING: 2,
    SHIPPED: 3,
    DELIVERED: 4,
    CANCELLED: 0,
  };

  const currentPriority = statusPriority[status];

  return allSteps.map((step, index) => ({
    ...step,
    isCompleted: index + 1 < currentPriority || status === "DELIVERED",
    isCurrent: index + 1 === currentPriority && status !== "DELIVERED",
  }));
};

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-5 text-center">
            <div className="max-w-md space-y-4">
                <h1 className="text-2xl font-bold text-basic">Please Log In</h1>
                <p className="text-muted">You need to be logged in to view your account.</p>
                <Link href="/login" className="btn w-full rounded-xl">Login Now</Link>
            </div>
        </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      orders: {
        include: {
          orderItems: {
            include: {
              product: {
                include: {
                  productImages: true
                }
              }
            }
          }
        },
        orderBy: { orderDate: 'desc' }
      }
    }
  });

  if (!user) return null;

  const activeOrders = user.orders.filter(o => o.orderStatus !== "DELIVERED" && o.orderStatus !== "CANCELLED");
  const pastOrders = user.orders.filter(o => o.orderStatus === "DELIVERED" || o.orderStatus === "CANCELLED");

  return (
    <main className="min-h-screen bg-background text-basic pb-20">
      {/* --- Premium Hero Section --- */}
      <section className="relative overflow-hidden bg-background-dark py-20 sm:py-28 border-b border-primary/10">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-bl from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Member Account</span>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tighter leading-tight italic">
                Welcome back,<br />
                <span className="text-primary not-italic">{user.name.split(' ')[0]}</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-4 bg-background/50 backdrop-blur-md p-4 rounded-2xl border border-primary/10 shadow-xl shadow-basic/5">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                    {user.name.charAt(0)}
                </div>
                <div>
                    <p className="text-xs text-muted uppercase font-bold tracking-widest">Signed in as</p>
                    <p className="font-semibold text-sm">{user.email}</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-20">
        {/* --- Sidebar: Profile Info --- */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-background-light border border-primary/20 rounded-3xl p-8 shadow-2xl shadow-basic/5">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
              <User className="w-4 h-4 text-primary" />
              Profile Details
            </h2>
            
            <div className="space-y-8">
                <div className="group">
                    <p className="text-[10px] uppercase font-bold text-muted mb-1 tracking-widest group-hover:text-primary transition-colors">Full Name</p>
                    <p className="text-lg font-bold tracking-tight">{user.name}</p>
                </div>
                
                <div className="group">
                    <p className="text-[10px] uppercase font-bold text-muted mb-1 tracking-widest group-hover:text-primary transition-colors">Phone Number</p>
                    <p className="text-lg font-bold tracking-tight">{user.phone || 'Not provided'}</p>
                </div>
                
                <div className="group">
                    <p className="text-[10px] uppercase font-bold text-muted mb-1 tracking-widest group-hover:text-primary transition-colors">Member Since</p>
                    <p className="text-lg font-bold tracking-tight">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-primary/10">
                <Link href="/account/settings" className="flex items-center justify-between text-sm font-bold hover:text-primary transition-colors group">
                    Edit Profile
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
          </div>

          <div className="bg-primary/10 rounded-3xl p-8 border border-primary/20 group hover:bg-primary/15 transition-all duration-500">
            <h3 className="text-xl font-black italic tracking-tighter mb-2">Need assistance?</h3>
            <p className="text-xs text-muted mb-6 leading-relaxed">Our support team is available mon-sat for any custom requests or order issues.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-tight group">
                Contact Support
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </aside>

        {/* --- Main Content: Orders --- */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Active Orders with Tracker */}
          {activeOrders.length > 0 && (
            <section className="space-y-6">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 px-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Active Orders ({activeOrders.length})
                </h2>
                
                <div className="space-y-8">
                    {activeOrders.map(order => (
                        <div key={order.id} className="bg-background-light border border-primary/20 rounded-3xl overflow-hidden shadow-xl shadow-basic/5 group">
                            <div className="p-6 sm:p-8 space-y-8">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Order ID</p>
                                        <h4 className="font-black text-lg tracking-tight uppercase">#{order.id.split('-')[0]}</h4>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Total Amount</p>
                                        <p className="text-2xl font-black text-primary tracking-tighter italic">₦{order.totalAmount.toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Order Items Preview */}
                                <div className="flex -space-x-4 overflow-hidden py-2">
                                    {order.orderItems.map((item, idx) => (
                                        <div key={item.id} className={`w-16 h-16 rounded-2xl border-4 border-background-light bg-background-dark overflow-hidden relative ${idx > 0 ? 'z-[idx]' : 'z-10'} hover:z-50 hover:-translate-y-2 transition-all duration-300`}>
                                            {item.product.productImages?.[0] ? (
                                                <Image 
                                                    src={item.product.productImages[0].url} 
                                                    alt={item.product.name} 
                                                    width={64} 
                                                    height={64}
                                                    className="w-full h-full object-cover" 
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                                                    <Package className="w-6 h-6 text-primary/40" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {order.orderItems.length > 3 && (
                                        <div className="w-16 h-16 flex items-center justify-center bg-primary/20 border-4 border-background-light rounded-2xl font-black text-xs relative z-50">
                                            +{order.orderItems.length - 3}
                                        </div>
                                    )}
                                </div>

                                {/* Progress Tracker */}
                                <div className="pt-4">
                                    <div className="relative flex justify-between">
                                        {/* Line Background */}
                                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-basic/5 -translate-y-1/2 rounded-full" />
                                        
                                        {getSteps(order.orderStatus as OrderStatus).map((step) => (
                                            <div key={step.name} className="relative z-10 flex flex-col items-center gap-3">
                                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-700 ${
                                                    step.isCompleted ? 'bg-primary text-background' : 
                                                    step.isCurrent ? 'bg-background-dark text-primary border-2 border-primary animate-pulse shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]' : 
                                                    'bg-background-dark text-muted/30 border border-basic/5'
                                                }`}>
                                                    <step.icon size={18} strokeWidth={step.isCurrent ? 3 : 2} />
                                                </div>
                                                <span className={`text-[9px] font-black uppercase tracking-widest ${
                                                    step.isCompleted ? 'text-primary' : 
                                                    step.isCurrent ? 'text-primary' : 
                                                    'text-muted/40'
                                                }`}>{step.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-primary/5 p-4 sm:px-8 flex justify-between items-center group-hover:bg-primary/10 transition-colors">
                                <span className="text-[10px] font-bold text-muted flex items-center gap-2 uppercase tracking-widest">
                                    <Clock className="w-3 h-3" />
                                    Estimated Delivery: 3-5 Business Days
                                </span>
                                <Link href={`/orders/${order.id}`} className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
          )}

          {/* Past Orders */}
          <section className="space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 px-2 text-muted">
                <PackageCheck className="w-4 h-4" />
                Order History
            </h2>
            
            {pastOrders.length > 0 ? (
                <div className="overflow-hidden border border-primary/10 bg-background-light/50 rounded-3xl shadow-sm">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-primary/5 text-[9px] font-black uppercase tracking-[0.2em] text-muted border-b border-primary/10">
                                <th className="px-8 py-5">Order ID</th>
                                <th className="px-8 py-5">Date</th>
                                <th className="px-8 py-5">Amount</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 hidden sm:table-cell text-right">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">
                            {pastOrders.map(order => (
                                <tr key={order.id} className="hover:bg-primary/5 transition-colors group">
                                    <td className="px-8 py-6 font-bold text-sm">#{order.id.split('-')[0]}</td>
                                    <td className="px-8 py-6 text-sm text-muted">{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td className="px-8 py-6 text-sm font-black italic">₦{order.totalAmount.toLocaleString()}</td>
                                    <td className="px-8 py-6">
                                        <OrderStatusBadge status={order.orderStatus} />
                                    </td>
                                    <td className="px-8 py-6 text-right hidden sm:table-cell">
                                        <Link href={`/orders/${order.id}`} className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-primary/20 hover:bg-primary hover:text-background transition-all">
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-background-light/30 border border-dashed border-primary/20 rounded-3xl p-16 text-center">
                    <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary/20">
                        <Search className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black italic tracking-tighter mb-2">No past orders yet.</h3>
                    <p className="text-xs text-muted mb-8 max-w-xs mx-auto">Your style journey with us is just beginning. Explore our latest collections today.</p>
                    <Link href="/store" className="btn px-8 rounded-2xl text-sm inline-flex items-center gap-2">
                        Start Shopping <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}
