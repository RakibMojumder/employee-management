const SearchBox = ({ setSearchValue }) => {
  return (
    <input
      type="text"
      placeholder="Search here"
      onChange={(e) => setSearchValue(e.target.value)}
      style={{
        padding: "10px",
        border: "1px solid steelblue",
        borderRadius: "4px",
      }}
    />
  );
};

export default SearchBox;
