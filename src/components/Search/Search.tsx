import "./Search.css";

interface SearchProps {
  value?: string;
  onChange: (breed: string) => void;
}

export const Search = ({ value, onChange }: SearchProps) => {
  return (
    <div className="search">
      <input
        className="search-input"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder="Search breeds..."
        aria-label="Search breeds"
      />
    </div>
  );
};
