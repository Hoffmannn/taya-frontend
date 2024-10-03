import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTableRow: {
      variants: [
        {
          props: { variant: "data" },
          style: {
            "&:hover": {
              background: "#f6f6f6",
            },
          },
        },
      ],
    },
    MuiTableCell: {
      variants: [
        {
          props: { variant: "header" },
          style: {
            fontSize: 16,
            backgroundColor: "#e6f2ff",
          },
        },
      ],
    },
  },
});

export default theme;
