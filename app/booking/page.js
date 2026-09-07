import BookingClient from "@/components/BookingClient";

export const metadata = {
  title: "Book: Gele Glamzzz | Reserve Your Gele Styling Experience",
  description: "Request your Gele Glamzzz appointment in five simple steps: bridal, traditional ceremony, celebration, photoshoot or private booking.",
  keywords: ["book gele appointment London", "gele styling booking", "reserve gele stylist"],
  alternates: { canonical: "/booking" },
};

export default function BookingPage() {
  return <BookingClient />;
}
