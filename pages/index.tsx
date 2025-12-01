
import { title, subtitle } from "@/components/primitives";
import { articleQueries } from "@/entities/article";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {

  


  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block text-center justify-center">
          <span className={title()}>Make&nbsp;</span>
          <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
          <br />
          <span className={title()}>
            websites regardless of your design experience.
          </span>

        </div>

      </section>
    </DefaultLayout>
  );
}
