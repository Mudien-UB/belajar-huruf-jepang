import type {Metadata} from "next";
import {Noto_Sans_JP, Shippori_Mincho} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";

const notoSansJP = Noto_Sans_JP({
    variable: "--font-noto-sans-jp",
    subsets: ["latin"],
});

const shipporiMincho = Shippori_Mincho({
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-shippori-mincho",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Belajar Bahasa Jepang",
    description: "Belajar Bahasa Jepang",
    authors: {
        name: "Ubay Lahmudien",
    },
    creator: "github.com/Mudien-UB",
    keywords: [
        "Belajar Bahasa Jepang",
        "Belajar",
        "Bahasa Jepang",
        "Hiragana",
    ]


};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${notoSansJP.variable} ${shipporiMincho.variable} h-full antialiased`}
        >
        <body className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <Navbar/>
        <main className="grow flex flex-col">{children}</main>
        <Footer/>
        </body>
        </html>
    );
}
