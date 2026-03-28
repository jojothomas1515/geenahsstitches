import Header from "@/components/main/Header";
import Footer from "@/components/main/Footer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getCartItemCount } from "@/actions/cart.actions";
import { CartProvider } from "@/context/CartProvider";


export default async function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });
  const cartItemCount = session ? await getCartItemCount() : 0;
  return (
    <CartProvider session={session} initialCartItemCount={cartItemCount}>
      <Header session={session} />
      {children}
      <Footer />
    </CartProvider>
  );
}
