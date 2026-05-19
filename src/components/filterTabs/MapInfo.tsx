import StringFilter from "../filterTypes/StringFilter";

export default function MapInfo() {
  return (
    <div className="filter-screen">
      <span className="user-tag-picker__category">Map Info</span>
      <StringFilter name="artist" label="Artist Name" />
      <StringFilter name="title" label="Song Title" />
      <StringFilter name="source" label="Song Source/Origin" />
      <StringFilter name="creator" label="Mapper Name" />
      <StringFilter name="difficulty" label="Difficulty Name" />
    </div>
  );
}
