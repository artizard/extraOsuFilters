interface FilterProps {
  name: string;
  label: string;
}

export default function DateFilter({ name, label }: FilterProps) {
  return <div>{label}</div>;
}
