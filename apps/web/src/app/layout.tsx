
import { NextUIProvider } from "@nextui-org/system";
import "../ui/styles/globals.css";
import { NavBar } from "../ui/components/commons/navbar";

export const metadata = {
  title: "Pet Lovers ",
  description: "An pet loving system!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <NextUIProvider>
          <NavBar/>
            {children}
        </NextUIProvider>
      </body>
    </html>
  );
}

