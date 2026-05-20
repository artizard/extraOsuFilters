import NumberFilter from "../filterTypes/NumberFilter";

export default function MapStats() {
  return (
    <div className="filter-screen">
      <span className="user-tag-picker__category">Map Stats</span>
      <div className="filter-container">
        <NumberFilter name="length" label="Song Length" defaultValue={90} />
        <NumberFilter
          name="circles"
          label="Number of Circles"
          defaultValue={150}
        />
        <NumberFilter
          name="sliders"
          label="Number of Sliders"
          defaultValue={75}
        />
        <NumberFilter
          name="keys"
          label="Number of Keys (mania)"
          defaultValue={300}
        />
      </div>
    </div>
  );
}
