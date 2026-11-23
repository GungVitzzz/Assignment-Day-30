import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";
import Container from "../layout/Container";
import { products } from "@/data/products";
import { priceRange } from "@/data/filters";
import { useState } from "react";

function CatalogSection() {
  const [range, setRange] = useState([priceRange.min, priceRange.max]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const toggleMaterial = (id) =>
    selectedMaterials.includes(id)
      ? setSelectedMaterials(
          selectedMaterials.filter((pickMat) => pickMat !== id)
        )
      : setSelectedMaterials([...selectedMaterials, id]);

  const toggleColor = (id) =>
    selectedColors.includes(id)
      ? setSelectedColors(
          selectedColors.filter((pickColor) => pickColor !== id)
        )
      : setSelectedColors([...selectedColors, id]);

  const filteredProduct = products.filter(
    (item) =>
      item.price >= range[0] &&
      item.price <= range[1] &&
      (selectedColors.length === 0 || selectedColors.includes(item.colorId)) &&
      (selectedMaterials.length === 0 ||
        selectedMaterials.includes(item.materialId))
  );

  return (
    <section>
      <Container className="flex gap-6 py-6 flex-wrap">
        <FilterSidebar
          range={range}
          setRange={setRange}
          selectedColors={selectedColors}
          toggleColor={toggleColor}
          selectedMaterials={selectedMaterials}
          toggleMaterial={toggleMaterial}
        />
        <ProductGrid filteredProduct={filteredProduct} />
      </Container>
    </section>
  );
}

export default CatalogSection;
