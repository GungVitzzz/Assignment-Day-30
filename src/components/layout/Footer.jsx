import Container from "./Container";
import { paymentLogo, brandLogo } from "@/data/brands";
import { footerLinks } from "@/data/footerLinks";

function Footer() {
  const links = footerLinks.map((outer) => (
    <div className="flex flex-col" key={outer.id}>
      <h3 className="text-base font-semibold mb-5">{outer.title}</h3>

      <ul className="flex flex-col gap-y-3">
        {outer.links.map((inner, index) => (
          <li key={inner + index}>
            <a
              className="text-base font-normal hover:underline hover:decoration-solid"
              href={inner.href}
            >
              {inner.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  ));

  return (
    <footer className="mt-12 border-t border-border">
      <Container className="py-6 space-y-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,12rem),1fr))] gap-8">
          <div>
            <a href={brandLogo.href} className="flex items-center gap-3">
              <img
                src={brandLogo.src}
                alt={brandLogo.alt}
                className="h-11.25 w-auto shrink-0"
              />
            </a>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,9rem),1fr))] gap-x-8 gap-y-8">
            {links}
          </div>
        </div>
        <div className="flex flex-col flex-wrap items-center justify-center gap-8 mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-center">
            Payment Partners
          </h2>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {paymentLogo.map((pay) => (
              <img
                key={pay.id}
                src={pay.source}
                alt={pay.alt}
                className="h-11 w-auto object-contain"
              />
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
