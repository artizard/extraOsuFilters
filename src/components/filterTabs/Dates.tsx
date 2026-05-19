import DateFilter from "../filterTypes/DateFilter";

export default function Dates() {
  return (
    <div className="filter-screen">
      <span className="user-tag-picker__category">Dates</span>
      <DateFilter name="created" label="Date Created" />
      <DateFilter name="updated" label="Date of Last Update" />
      <DateFilter name="ranked" label="Date Ranked" />
    </div>
  );
}
