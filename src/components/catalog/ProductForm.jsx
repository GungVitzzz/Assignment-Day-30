import { Button } from "@/components/ui/button";
import { priceRange } from "@/data/filters";
import { useState } from "react";

function ProductForm({ product, categories, saving, onSubmit, onCancel }) {
  const [values, setValues] = useState(() => ({
    title: product?.title ?? "",
    category: product?.category ?? categories[0] ?? "",
    description: product?.description ?? "",
    image: product?.image ?? "",
    price: product ? String(product.price) : ""
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...values,
      price: Number(values.price),
      rating: product?.rating ?? { rate: 0, count: 0 }
    });
  };

  const inputClassName =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

  return (
    <form
      className="grid gap-4 rounded-xl border border-border bg-card p-4 md:grid-cols-2"
      onSubmit={handleSubmit}
    >
      <label className="flex flex-col gap-1 text-sm font-medium">
        Nama produk
        <input
          className={inputClassName}
          name="title"
          value={values.title}
          onChange={handleChange}
          required
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium">
        Kategori
        <select
          className={inputClassName}
          name="category"
          value={values.category}
          onChange={handleChange}
          required
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium">
        Harga (USD)
        <input
          className={inputClassName}
          name="price"
          type="number"
          min={priceRange.min}
          step={priceRange.step}
          value={values.price}
          onChange={handleChange}
          required
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium">
        URL gambar
        <input
          className={inputClassName}
          name="image"
          type="url"
          value={values.image}
          onChange={handleChange}
          required
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium md:col-span-2">
        Deskripsi
        <textarea
          className={inputClassName}
          name="description"
          rows={4}
          value={values.description}
          onChange={handleChange}
          required
        />
      </label>
      <div className="flex gap-2 md:col-span-2">
        <Button type="submit" disabled={saving}>
          {saving
            ? "Menyimpan..."
            : product
              ? "Simpan perubahan"
              : "Tambah produk"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={saving}
        >
          Batal
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;
