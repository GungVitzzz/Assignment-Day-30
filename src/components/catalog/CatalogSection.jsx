import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import ProductForm from "./ProductForm";
import Container from "../layout/Container";
import { Button } from "@/components/ui/button";
import { priceRange } from "@/data/filters";
import { isProduct } from "@/lib/isProduct";
import { useState, useEffect } from "react";

const itemsPerPage = 6;
const productsUrl = "https://fakestoreapi.com/products";

function getPriceBounds(products) {
  if (products.length === 0) {
    return [priceRange.min, priceRange.max];
  }

  const prices = products.map((item) => item.price);
  return [Math.min(...prices), Math.max(...prices)];
}

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
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [savingProduct, setSavingProduct] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [mutationError, setMutationError] = useState(null);

  useEffect(() => {
    const productsRequest = fetch(productsUrl).then(
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
        if (
          !Array.isArray(data) ||
          !data.every((category) => typeof category === "string")
        ) {
          throw new Error("Data kategori tidak valid.");
        }
        setCategories(data);
      });

    Promise.all([productsRequest, categoriesRequest])
      .then(([data]) => {
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Data produk tidak tersedia.");
        }

        if (!data.every(isProduct)) {
          throw new Error("Data produk tidak valid.");
        }

        const bounds = getPriceBounds(data);
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

  const toggleCategory = (category) => {
    setCurrentPage(1);
    setSelectedCategories((categories) =>
      categories.includes(category)
        ? categories.filter((item) => item !== category)
        : [...categories, category]
    );
  };

  const updateRange = (nextRange) => {
    setRange(nextRange);
    setCurrentPage(1);
  };

  const closeProductForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const openCreateForm = () => {
    setEditingProduct(null);
    setMutationError(null);
    setShowProductForm(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setMutationError(null);
    setShowProductForm(true);
  };

  const saveProduct = async (values) => {
    setSavingProduct(true);
    setMutationError(null);

    try {
      const isEditing = editingProduct !== null;
      const response = await fetch(
        isEditing ? `${productsUrl}/${editingProduct.id}` : productsUrl,
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menyimpan produk.");
      }

      const savedProduct = await response.json();
      if (!isProduct(savedProduct)) {
        throw new Error("Respons produk tidak valid.");
      }

      const nextProducts = isEditing
        ? products.map((item) =>
            item.id === editingProduct.id ? savedProduct : item
          )
        : [savedProduct, ...products];
      const bounds = getPriceBounds(nextProducts);
      setProducts(nextProducts);
      setPriceBounds(bounds);
      setRange(bounds);
      setCurrentPage(1);
      if (!isEditing) {
        setSelectedCategories([]);
      }
      closeProductForm();
    } catch (error) {
      console.error("Gagal menyimpan produk:", error);
      setMutationError("Gagal menyimpan produk. Silakan coba lagi.");
    } finally {
      setSavingProduct(false);
    }
  };

  const deleteProduct = async (product) => {
    if (!window.confirm(`Hapus produk "${product.title}"?`)) {
      return;
    }

    setDeletingProductId(product.id);
    setMutationError(null);

    try {
      const response = await fetch(`${productsUrl}/${product.id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus produk.");
      }

      const nextProducts = products.filter((item) => item.id !== product.id);
      const bounds = getPriceBounds(nextProducts);
      setProducts(nextProducts);
      setPriceBounds(bounds);
      setRange(bounds);
      setCurrentPage(1);
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
      setMutationError("Gagal menghapus produk. Silakan coba lagi.");
    } finally {
      setDeletingProductId(null);
    }
  };

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
          setRange={updateRange}
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
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={openCreateForm}
                disabled={savingProduct || deletingProductId !== null}
              >
                Tambah produk
              </Button>
            </div>
            {mutationError && <p role="alert">{mutationError}</p>}
            {showProductForm && (
              <ProductForm
                key={editingProduct?.id ?? "new-product"}
                product={editingProduct}
                categories={categories}
                saving={savingProduct}
                onSubmit={saveProduct}
                onCancel={closeProductForm}
              />
            )}
            {filteredProduct.length === 0 ? (
              <p role="status">Tidak ada produk yang cocok dengan filter.</p>
            ) : (
              <>
                <ProductGrid
                  paginatedProduct={paginatedProduct}
                  onEdit={openEditForm}
                  onDelete={deleteProduct}
                  disabled={savingProduct || deletingProductId !== null}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

export default CatalogSection;
