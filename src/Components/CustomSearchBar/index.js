import "./style.css";

const CustomSearchBar = (props) => {
  return (
    <>
      <input
        type="search"
        className="searchBar"
        placeholder={props?.placeholder}
        onChange={props?.onChange}
      />
    </>
  );
};

export default CustomSearchBar;
