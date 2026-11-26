import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import Container from "../layout/Container";
import { priceRange } from "@/data/filters";
import { useState, useEffect } from "react";

const itemsPerPage = 6;

function CatalogSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [range, setRange] = useState([priceRange.min, priceRange.max]);
  const [priceBounds, setPriceBounds] = useState([
    priceRange.min,
    priceRange.max
  ]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const productsRequest = fetch("https://fakestoreapi.com/products").then(
      (response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data produk.");
        }
        return response.json();
      }
    );
    const categoriesRequest = fetch(
      "https://fakestoreapi.com/products/categories"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil kategori produk.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Kategori produk:", data);
        if (!Array.isArray(data)) {
          throw new Error("Data kategori tidak valid.");
        }
        setCategories(data);
      });

    Promise.all([productsRequest, categoriesRequest])
      .then(([data]) => {
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Data produk tidak tersedia.");
        }

        const prices = data.map((item) => item.price);
        const bounds = [Math.min(...prices), Math.max(...prices)];
        setProducts(data);
        setPriceBounds(bounds);
        setRange(bounds);
      })
      .catch((error) => {
        console.error("Gagal ambil data:", error);
        setError("Gagal memuat katalog. Silakan coba lagi.");
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleCategory = (category) =>
    setSelectedCategories((categories) =>
      categories.includes(category)
        ? categories.filter((item) => item !== category)
        : [...categories, category]
    );

  const filteredProduct = products.filter(
    (item) =>
      item.price >= range[0] &&
      item.price <= range[1] &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(item.category))
  );
  const totalPages = Math.ceil(filteredProduct.length / itemsPerPage);
  const paginatedProduct = filteredProduct.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section>
      <Container className="flex gap-6 py-6 flex-wrap">
        <FilterSidebar
          range={range}
          setRange={setRange}
          priceBounds={priceBounds}
          categories={categories}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
        />
        {loading ? (
          <p role="status">Memuat produk...</p>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : (
          <div className="min-w-0 flex-[3_1_30rem] space-y-6">
            <ProductGrid paginatedProduct={paginatedProduct} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </Container>
    </section>
  );
}

export default CatalogSection;
