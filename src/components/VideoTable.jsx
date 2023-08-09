import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, CircularProgress } from "@mui/material";
import { Search } from "@mui/icons-material";

const columns = [
  { id: "address", label: "Address", minWidth: 170 },
  { id: "stage", label: "Status", minWidth: 100 },
  { id: "videoid", label: "Video ID", minWidth: 100 },
  { id: "get", label: "Get", minWidth: 100 },
];

function createData(address, stage, videoid, get) {
  return { address, stage, videoid, get };
}

export default function VideoTable({ videos }) {
  const rows = videos.map((video) => {
    return createData(video.address, video.stage, video.videoid, video.get);
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.stage}</TableCell>
                    <TableCell>{row.videoid}</TableCell>
                    <Button
                      startIcon={
                        row.isProcessing ? (
                          <CircularProgress size={20} />
                        ) : (
                          <Search size={20} />
                        )
                      }
                      variant="outlined"
                      size="small"
                      mt={2}
                    >
                      {row.get}
                    </Button>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
