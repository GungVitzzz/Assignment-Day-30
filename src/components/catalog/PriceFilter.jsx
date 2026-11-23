import { Slider } from "@/components/ui/slider";
import { priceRange } from "@/data/filters";
import { style } from "@/data/styles";

function PriceFilter({ range, setRange }) {
  return (
    <section className={style.section}>
      <h2 className="text-sm font-semibold">Price</h2>

      <Slider
        value={range}
        onValueChange={setRange}
        min={priceRange.min}
        max={priceRange.max}
        step={priceRange.step}
      />

      <div className="flex justify-between text-sm font-normal">
        <span>Rp {range[0].toLocaleString("id-ID")}</span>
        <span>Rp {range[1].toLocaleString("id-ID")}</span>
      </div>
    </section>
  );
}

export default PriceFilter;
