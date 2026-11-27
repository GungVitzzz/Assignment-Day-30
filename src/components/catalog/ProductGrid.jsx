import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function ProductCard({ item, onEdit, onDelete, disabled }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <Link to={`/products/${item.id}`} className="flex flex-1 flex-col">
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
      <div className="flex gap-2 px-4 pb-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => onEdit(item)}
          disabled={disabled}
        >
          Ubah
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={() => onDelete(item)}
          disabled={disabled}
        >
          Hapus
        </Button>
      </div>
    </article>
  );
}

function ProductGrid({ paginatedProduct, onEdit, onDelete, disabled }) {
  return (
    <div className="grid min-w-0 flex-[3_1_30rem] gap-6 grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))]">
      {paginatedProduct.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
