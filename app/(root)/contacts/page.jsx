import { auth } from "@/auth";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contacts",
};

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex-center flex-1 pt-8 pb-16">
      <section className="mx-auto w-full max-w-6xl gap-y-10 px-4 sm:px-10 md:px-18 lg:grid lg:grid-cols-[2fr_1fr] lg:gap-x-18">
        <h2 className="text-4xl font-semibold lg:col-span-full">
          Have any questions?<br></br> Contact us.
        </h2>

        <ContactForm user={session?.user || undefined} />

        <article className="flex flex-col gap-8 font-light">
          <div>
            <h4 className="mb-2 text-lg font-bold">Customer service</h4>
            <p>info@gamestation.com</p>
            <p>(706) 384-7267</p>
          </div>
          <div>
            <h4 className="mb-2 text-lg font-bold">Company Details</h4>
            <p>GAME STATION LTD</p>
            <p>
              1234 Maple Street<br></br> Springfield, IL 62704
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}
