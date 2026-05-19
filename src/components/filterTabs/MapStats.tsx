import NumberFilter from "../filterTypes/NumberFilter";

export default function MapStats() {
  return (
    <div className="filter-screen">
      <span className="user-tag-picker__category">Map Stats</span>
      <NumberFilter name="length" label="Song Length" />
      <NumberFilter name="circles" label="Number of Circles" />
      <NumberFilter name="sliders" label="Number of Sliders" />
      <NumberFilter name="keys" label="Number of Keys (mania)" />
    </div>
  );
}
