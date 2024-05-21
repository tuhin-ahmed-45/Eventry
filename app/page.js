import EventList from "@/components/landing/Event/EventList";
import Header from "@/components/landing/Header";
import Loading from "@/components/landing/Loading";
import { Suspense } from "react";

export default function HomePage({ searchParams: { query } }) {
  return (
    <section className="container">
      <Header />
      <Suspense key={query} fallback={<Loading/>}>
        <EventList query={query} />
      </Suspense>
    </section>
  );
}
