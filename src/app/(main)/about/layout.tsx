import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Geenahs Stitches",
  description:
    "Discover our world of bespoke fashion and expert tailoring. We craft custom designs with precision, style, and passion — from everyday elegance to statement pieces that fit you perfectly.",
};

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AboutLayout;
