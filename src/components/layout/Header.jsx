import { iconLinks, userProfile } from "@/data/headerAssets";
import { brandLogo } from "@/data/brands";
import Container from "./Container";

function Header() {
  const icons = iconLinks.map((icon) => (
    <a key={icon.id} href={icon.href}>
      <img src={icon.src} alt={icon.alt} />
    </a>
  ));

  return (
    <header>
      <Container className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3">
        <a href={brandLogo.href} className="flex items-center gap-3">
          <img
            src={brandLogo.src}
            alt={brandLogo.alt}
            className="h-10 w-auto"
          />
          <p className="text-2xl font-bold">{brandLogo.name}</p>
        </a>

        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-6 flex-wrap">{icons}</div>

          <a href={userProfile.href} className="flex items-center gap-3">
            <img
              src={userProfile.avatarSrc}
              alt={userProfile.avatarAlt}
              className="h-10 w-10 rounded-full object-cover bg-cyan-400"
            />
            <span className="font-semibold">
              {userProfile.greeting}, {userProfile.name}
            </span>
          </a>
        </div>
      </Container>
    </header>
  );
}

export default Header;
