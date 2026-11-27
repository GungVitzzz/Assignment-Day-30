import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Container from "@/components/layout/Container";
import { isProduct } from "@/lib/isProduct";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data produk.");
        }
        return response.json();
      })
      .then((data) => {
        if (!isProduct(data)) {
          throw new Error("Data produk tidak valid.");
        }

        console.log("Detail produk:", data);
        setProduct(data);
      })
      .catch((error) => {
        console.error("Gagal ambil data produk:", error);
        setError("Gagal memuat produk. Silakan coba lagi.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p role="status">Memuat produk...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <Container className="flex flex-col gap-6 py-8">
      <Button render={<Link to="/" />}>Kembali ke katalog</Button>
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div className="flex aspect-square items-center justify-center rounded-xl border border-border bg-card p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex flex-col items-start gap-4">
          <Badge variant="secondary">{product.category}</Badge>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-sm text-muted-foreground">
            Rating: {product.rating.rate} / 5 ({product.rating.count} reviews)
          </p>
          <p className="text-xl font-semibold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD"
            }).format(product.price)}
          </p>
          <p>{product.description}</p>
        </div>
      </div>
    </Container>
  );
}

export default ProductDetailPage;
