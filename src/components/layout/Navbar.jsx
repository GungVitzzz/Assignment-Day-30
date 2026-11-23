import { categories } from "@/data/headerAssets";
import { Button } from "@/components/ui/button";
import Container from "./Container";

function Navbar() {
  const category = categories.map((cat, index) => (
    <li key={cat + index}>
      <a
        href="#"
        className="font-medium hover:text-ring hover:underline hover:decoration-solid"
      >
        {cat}
      </a>
    </li>
  ));

  return (
    <nav>
      <Container className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 py-3">
        <ul className="flex flex-wrap min-w-0 gap-x-4 gap-y-2">{category}</ul>
        <div className="flex items-center gap-3">
          <Button type="button">Explore</Button>
          <Button type="button" variant="outline">
            Sale
          </Button>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
