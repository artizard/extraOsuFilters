interface FilterProps {
  name: String;
  label: String;
}
export default function StringFilter({ name, label }: FilterProps) {
  return <div>{label}</div>;
}
