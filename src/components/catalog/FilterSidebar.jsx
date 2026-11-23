import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { style } from "@/data/styles";
import { colorOptions } from "@/data/filters";
import { materialOptions } from "@/data/filters";
import PriceFilter from "./PriceFilter";

function ColorFilter({ selectedColors, toggleColor }) {
  const colors = colorOptions.map((color) => (
    <div key={color.id} className="flex gap-x-3">
      <Checkbox
        id={color.id}
        onCheckedChange={() => toggleColor(color.id)}
        checked={selectedColors.includes(color.id)}
      />
      <span
        className="size-4 rounded-full"
        style={{ backgroundColor: color.hex }}
      ></span>
      <Label htmlFor={color.id}>{color.label}</Label>
    </div>
  ));

  return (
    <section className={style.section}>
      <h2 className={style.h2}>Color</h2>

      <div className="flex flex-col gap-y-4">{colors}</div>
    </section>
  );
}

function MaterialFilter({ selectedMaterials, toggleMaterial }) {
  const materials = materialOptions.map((mat) => (
    <div key={mat.id} className="flex gap-x-3">
      <Checkbox
        id={mat.id}
        onCheckedChange={() => toggleMaterial(mat.id)}
        checked={selectedMaterials.includes(mat.id)}
      />
      <Label htmlFor={mat.id}>{mat.label}</Label>
    </div>
  ));

  return (
    <section className={style.section}>
      <h2 className={style.h2}>Material</h2>

      <div className="flex flex-col gap-y-4">{materials}</div>
    </section>
  );
}

function FilterSidebar({
  range,
  setRange,
  selectedColors,
  toggleColor,
  selectedMaterials,
  toggleMaterial
}) {
  return (
    <aside className="min-w-0 flex-[1_1_15rem] space-y-4 self-start">
      <PriceFilter range={range} setRange={setRange} />
      <ColorFilter selectedColors={selectedColors} toggleColor={toggleColor} />
      <MaterialFilter
        selectedMaterials={selectedMaterials}
        toggleMaterial={toggleMaterial}
      />
    </aside>
  );
}

export default FilterSidebar;
