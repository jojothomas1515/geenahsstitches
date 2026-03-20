import Header from "@/components/main/Header";
import Footer from "@/components/main/Footer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <>
      <Header session={session} />
      {children}
      <Footer />
    </>
  );
}
