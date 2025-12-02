
import { title, subtitle } from "@/components/primitives";
import { articleQueries } from "@/entities/article";
import DefaultLayout from "@/layouts/default";
import { ArticlesList } from "@/widgets/articles-list";

export default function IndexPage() {

  


  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:pb-10">
        <div className="inline-block text-center justify-center mb-2">
          <span className={title()}>Читай,&nbsp;</span>
          <span className={title({ color: "violet" })}>пиши,&nbsp;</span>
          <span className={title()}>
            обсуждай.
          </span>
        </div>
        <ArticlesList/>
      </section>
    </DefaultLayout>
  );
}
