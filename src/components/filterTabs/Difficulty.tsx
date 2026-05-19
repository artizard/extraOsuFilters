import NumberFilter from "../filterTypes/NumberFilter";

export default function Difficulty() {
  return (
    <div className="filter-screen">
      <span className="user-tag-picker__category">Difficulty</span>
      <NumberFilter name="ar" label="Approach Rate" />
      <NumberFilter name="cs" label="Circle Size" />
      <NumberFilter name="od" label="Overall Difficulty" />
      <NumberFilter name="hp" label="HP Drain Rate" />
      <NumberFilter name="stars" label="Star Rating" />
      <NumberFilter name="bpm" label="Song BPM" />
    </div>
  );
}
