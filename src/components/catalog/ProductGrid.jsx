import { Link } from "react-router-dom";

function ProductCard({ item }) {
  return (
    <Link
      to={`/products/${item.id}`}
      className="flex flex-col overflow-hidden rounded-xl border border-border bg-card"
    >
      <img
        src={item.image}
        alt={item.description}
        className="aspect-square w-full object-cover"
      />

      <div className="flex flex-col gap-4 p-4">
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.category}</p>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {item.description}
        </p>
        <p className="font-semibold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          }).format(item.price)}
        </p>
      </div>
    </Link>
  );
}

function ProductGrid({ paginatedProduct }) {
  return (
    <div className="grid min-w-0 flex-[3_1_30rem] gap-6 grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))]">
      {paginatedProduct.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ProductGrid;
