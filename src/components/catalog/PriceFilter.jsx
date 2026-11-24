import { Slider } from "@/components/ui/slider";
import { priceRange } from "@/data/filters";
import { style } from "@/data/styles";

function PriceFilter({ range, setRange, priceBounds }) {
  return (
    <section className={style.section}>
      <h2 className="text-sm font-semibold">Price</h2>

      <Slider
        value={range}
        onValueChange={setRange}
        min={priceBounds[0]}
        max={priceBounds[1]}
        step={priceRange.step}
      />

      <div className="flex justify-between text-sm font-normal">
        <span>${range[0].toFixed(2)}</span>
        <span>${range[1].toFixed(2)}</span>
      </div>
    </section>
  );
}

export default PriceFilter;
