import type {Metadata} from "next";
import {Noto_Sans_JP, Shippori_Mincho} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { AutoHintProvider } from "@/context/AutoHintContext";

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
    title: {
        default: "Belajar Huruf Jepang",
        template: "%s | Belajar Huruf Jepang",
    },
    description: "Platform interaktif untuk belajar menulis dan menghafal huruf Hiragana Jepang, mulai dari pengenalan hingga kuis sambung-cocok.",
    authors: {
        name: "Ubay Lahmudien",
        url: "https://github.com/Mudien-UB",
    },
    creator: "Ubay Lahmudien",
    keywords: [
        "Belajar Huruf Jepang",
        "Belajar Hiragana",
        "Menulis Hiragana",
        "Huruf Jepang",
        "Hiragana",
        "Aplikasi Belajar Hiragana",
        "Cara Menulis Hiragana",
        "Latihan Hiragana Dasar",
        "Dakuten",
        "Handakuten",
        "Yoon",
        "Tutorial Hiragana",
        "Edukasi Bahasa Jepang",
        "Kuis Hiragana",
        "Sambung Cocok Hiragana",
        "Belajar Aksara Jepang"
    ],
    verification: {
        google: "IBqiaru0M7igxwEDLW1RxlWfsICkTSwxg7pp2wUgGoE",
    },
    openGraph: {
        title: "Belajar Huruf Jepang",
        description: "Platform interaktif untuk belajar menulis dan menghafal huruf Hiragana Jepang dengan mudah dan menyenangkan.",
        siteName: "Belajar Huruf Jepang",
        type: "website",
        locale: "id_ID",
    },
    twitter: {
        card: "summary_large_image",
        title: "Belajar Huruf Jepang",
        description: "Platform interaktif untuk belajar menulis dan menghafal huruf Hiragana Jepang.",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html
            lang="id"
            className={`${notoSansJP.variable} ${shipporiMincho.variable} h-full antialiased`}
        >
        <body className="min-h-screen flex flex-col bg-background text-foreground font-sans overflow-x-hidden">
        <AutoHintProvider>
            <Navbar/>
            <main className="grow flex flex-col">{children}</main>
            <Footer/>
        </AutoHintProvider>
        </body>
        </html>
    );
}
