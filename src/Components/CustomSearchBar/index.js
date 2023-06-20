import "./style.css";

const CustomSearchBar = ({placeholder, onChange, className}) => {
  return (
    <>
      <input
        type="search"
        className={`searchBar ${className}`}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};

export default CustomSearchBar;
