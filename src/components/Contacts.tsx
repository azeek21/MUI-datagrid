import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import fetchContacts from "../mock/mockFetch";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import AvatarWithModal from "./AvatarWithModal";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Typography } from "@mui/material";
import { Cloud, Save, SimCard } from "@mui/icons-material";
export default function Contacts() {
  const { data, isLoading, isError } = useQuery(["contacts"], fetchContacts);
  const [dataState, setDataState] = useState(() => {
    const state = localStorage.getItem("dataGridState");
    if (state) {
      return JSON.parse(state);
    }
    return {};
  });

  const columns = useMemo(() => {
    const clmns: GridColDef[] = [
      {
        field: "id",
        headerName: "Id",
        width: 80,
      },
      {
        field: "photo",
        headerName: "Avatar",
        width: 80,
        sortable: false,
        filterable: false,
        renderCell: (param) => <AvatarWithModal src={param.row.photo} />,
        hideable: false,
        disableColumnMenu: true,
      },
      {
        field: "firstName",
        headerName: "First Name",
        width: 150,
        editable: true,
        cellClassName: "name",
      },
      {
        field: "lastName",
        headerName: "Last Name",
        width: 150,
        editable: true,
        cellClassName: (param) => {
          return param.value.length > 0 ? "filled" : "empty";
        },
      },
      { field: "number", headerName: "Number", width: 150, editable: true },
      {
        field: "email",
        headerName: "Email",
        width: 200,
        editable: true,
        cellClassName: "email",
      },
      {
        field: "location",
        headerName: "Storage",
        width: 150,
        type: "singleSelect",
        editable: true,
        valueOptions: ["cloud", "local", "SIM"],
        renderCell: (param) => {
          return (
            <Typography>
              {param.value == "cloud" ? (
                <Cloud />
              ) : param.value === "SIM" ? (
                <SimCard />
              ) : (
                <Save />
              )}
            </Typography>
          );
        },
      },
      {
        field: "createdAt",
        headerName: "Created At",
        valueGetter: (param) => dayjs(param.row.createdAt).unix(),
        width: 200,
        renderCell: (param) => (
          <DatePicker
            defaultValue={dayjs(param.row.createdAt)}
            sx={{ border: "none", outline: "none" }}
          />
        ),
      },
    ];
    return clmns;
  }, []);

  return (
    <DataGrid
      initialState={dataState}
      onStateChange={(state) => {
        localStorage.setItem("dataGridState", JSON.stringify(state));
      }}
      getRowHeight={(param) => {
        // here we can calculate row height depending on para.row
        return 100;
      }}
      sx={{ mt: "5rem", width: "100%", height: 500 }}
      rows={data || []}
      columns={columns}
      loading={isLoading}
      autoPageSize
      getRowId={(row) => row.id}
    />
  );
}
