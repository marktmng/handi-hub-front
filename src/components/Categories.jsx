import { Box, ListItem, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "../Constant";

function Categories({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: ENDPOINTS.CATEGORY.GET_ALL,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load categories");
      });
  }, []);

  return (
    <Box>
      {error && <Typography color="error">{error}</Typography>}

      {categories.length === 0 && !error && (
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
          No categories found.
        </Typography>
      )}

      <ul style={{ paddingLeft: 0 }}>
        {categories.map((category) => (
          <ListItem
            key={category.categoryId}
            sx={{ cursor: "pointer", padding: 1, paddingLeft: 4 }}
            onClick={() => onCategorySelect(category.categoryId)}
          >
            <Typography
              variant="h6"
              color="inherit"
              sx={{ fontWeight: 700, fontSize: 12 }}
            >
              {category.categoryName}
            </Typography>
          </ListItem>
        ))}
      </ul>
    </Box>
  );
}

export default Categories;
