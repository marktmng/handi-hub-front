import YoutubeSearchedForSharpIcon from "@mui/icons-material/YoutubeSearchedForSharp";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 300,
        borderRadius: "30px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <InputBase
        sx={{ ml: 2, flex: 1 }}
        placeholder="Search products"
        inputProps={{ "aria-label": "search products" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleSearch}
      >
        <YoutubeSearchedForSharpIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;
