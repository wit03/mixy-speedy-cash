import Navbar from "../components/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
        <div className="flex flex-col min-h-screen">
        {children}
        <div className="flex flex-grow"></div>
        <Navbar />
        </div>
    </>
  );
}
