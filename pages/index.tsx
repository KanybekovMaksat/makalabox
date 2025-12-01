import { title, subtitle } from "@/components/primitives";
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
          <div className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library. Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi molestias adipisci praesentium sit blanditiis earum. Autem obcaecati, ipsa id officiis, et sint ratione quam voluptate enim temporibus ab facere.
            Porro in iure, ad vitae deleniti dolores inventore quos nobis culpa tempore vel! Tenetur, maxime corrupti ipsam repellat sequi totam molestiae enim deserunt saepe unde laudantium rerum aspernatur eveniet dignissimos?
            Tempora ad, natus libero error alias sint tempore dicta pariatur non esse rerum quia culpa quos commodi architecto, quas mollitia quam eum provident vitae voluptatem facere. Officia ducimus exercitationem quis.
            Veniam delectus, nisi fugit cum vel consequuntur quae, sed recusandae officia atque sapiente eaque aliquid? Facilis quam dolorum, doloribus voluptatum vitae molestias distinctio nostrum aperiam iure dolores eligendi, culpa aut.
            Perferendis eos doloribus sapiente reiciendis voluptas? Natus nulla nesciunt, temporibus, eaque ea porro non, molestiae ratione cupiditate ipsum libero. Dicta accusamus voluptatum nostrum necessitatibus magni, ipsum quaerat nihil et corrupti?
            Facilis maiores velit, voluptatibus sed adipisci eius cumque ad sit inventore reprehenderit illo, molestias est minus eveniet. Officiis perferendis fugiat aliquid vero error molestiae similique, porro necessitatibus rerum harum delectus.
            Saepe voluptatem, tempore recusandae suscipit, architecto error enim dolorem neque porro quaerat libero. Minus provident laborum nostrum necessitatibus deleniti tenetur rem ducimus eius doloremque. Laudantium odio similique harum veritatis iste?
            Animi minus voluptatibus laborum, eius quae esse fugit temporibus reprehenderit porro iure similique alias aut reiciendis dignissimos, officia soluta dolore assumenda natus! Laboriosam illum beatae cum provident harum unde neque.
            Nesciunt pariatur debitis dolorem esse, quis soluta labore error quo ullam commodi? Ad facere modi optio ratione, possimus dignissimos tenetur non provident officia error ipsum nam. Molestias nostrum consectetur repudiandae.
            Deserunt, dignissimos consectetur veniam facere repudiandae consequuntur earum ullam nulla perferendis. Aliquam, quam minus deserunt ex natus cupiditate quos qui quidem reiciendis itaque alias iste inventore mollitia placeat blanditiis quisquam.
          </div>
        </div>

      </section>
    </DefaultLayout>
  );
}
