interface FilterProps {
  name: string;
  label: string;
}
export default function StringFilter({ name, label }: FilterProps) {
  return <div>{label}</div>;
}
