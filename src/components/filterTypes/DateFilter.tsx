interface FilterProps {
  name: String;
  label: String;
}

export default function DateFilter({ name, label }: FilterProps) {
  return <div>{label}</div>;
}
