import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { style } from "@/data/styles";
import PriceFilter from "./PriceFilter";

function CategoryFilter({ categories, selectedCategories, toggleCategory }) {
  return (
    <section className={style.section}>
      <h2 className={style.h2}>Category</h2>
      <div className="flex flex-col gap-y-4">
        {categories.map((category) => (
          <div key={category} className="flex gap-x-3">
            <Checkbox
              id={category}
              onCheckedChange={() => toggleCategory(category)}
              checked={selectedCategories.includes(category)}
            />
            <Label htmlFor={category}>{category}</Label>
          </div>
        ))}
      </div>
    </section>
  );
}

function FilterSidebar({
  range,
  setRange,
  priceBounds,
  categories,
  selectedCategories,
  toggleCategory
}) {
  return (
    <aside className="min-w-0 flex-[1_1_15rem] space-y-4 self-start">
      <PriceFilter
        range={range}
        setRange={setRange}
        priceBounds={priceBounds}
      />
      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
      />
    </aside>
  );
}

export default FilterSidebar;
