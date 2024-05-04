import Navbar from "../components/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
        <div className="min-h-screen">
        {children}
        </div>
        <Navbar />
    </>
  );
}
