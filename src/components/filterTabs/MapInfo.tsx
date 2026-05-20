import StringFilter from "../filterTypes/StringFilter";

export default function MapInfo() {
  return (
    <div className="filter-screen">
      <span className="user-tag-picker__category">Map Info</span>
      <div className="filter-container">
        <StringFilter name="artist" label="Artist Name" />
        <StringFilter name="title" label="Song Title" />
        <StringFilter name="source" label="Song Source/Origin" />
        <StringFilter name="creator" label="Mapper Name" />
        <StringFilter name="difficulty" label="Difficulty Name" />
      </div>
    </div>
  );
}
