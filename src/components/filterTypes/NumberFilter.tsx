interface FilterProps {
  name: String;
  label: String;
}
export default function NumberFilter({ name, label }: FilterProps) {
  return <div>{label}</div>;
}
