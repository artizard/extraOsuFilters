interface MenuProps {
  defaultMenu: HTMLElement | null;
}

export default function FilterMenu({ defaultMenu }: MenuProps) {
  return (
    <div
      style={{
        background: "#2b2b2e",
        color: "white",
        padding: "20px",
        fontSize: "24px",
        fontWeight: "bold",
        position: "relative",
        width: "150px",
        alignSelf: "stretch",
      }}
      className="user-tag-picker"
    >
      TEST
    </div>
  );
}
