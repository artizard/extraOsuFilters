import NumberFilter from "../filterTypes/NumberFilter";

export default function Difficulty() {
  return (
    <div className="filter-screen">
      <span className="user-tag-picker__category">Difficulty</span>
      <div className="filter-container">
        <NumberFilter name="ar" label="Approach Rate" defaultValue={8} />
        <NumberFilter name="cs" label="Circle Size" defaultValue={4} />
        <NumberFilter name="od" label="Overall Difficulty" defaultValue={6} />
        <NumberFilter name="hp" label="HP Drain Rate" defaultValue={5} />
        <NumberFilter name="stars" label="Star Rating" defaultValue={4.5} />
        <NumberFilter name="bpm" label="Song BPM" defaultValue={150} />
      </div>
    </div>
  );
}
