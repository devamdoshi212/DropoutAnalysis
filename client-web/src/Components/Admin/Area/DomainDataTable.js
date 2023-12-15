import React, { useState, useEffect } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

export default function DomainDataTable() {
    const [deleterefresh, setdeleterefresh] = useState(true);
    const [customers, setCustomers] = useState(null);

    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [globalFilterValues, setGlobalFilterValues] = useState({
        State: "",
        District: "",
        Taluka: "",
        City: "",
    });



    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters["global"].value = value;
        // Update the global filter value for all fields
        setGlobalFilterValues({
            State: value,
            District: value,
            Taluka: value,
            City: value,
        });

        setFilters(_filters);
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        });

        setGlobalFilterValues({
            State: "",
            District: "",
            Taluka: "",
            City: "",
        });
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-between mr-2">
                <Button
                    type="button"
                    label="Clear"
                    outlined
                    className="px-4 py-2 rounded-lg text-blue-800 ring-0 border-2 border-blue-700 hover:bg-gray-200"
                    onClick={clearFilter}
                />

                <span className="p-input-icon-left">
                    <InputText
                        value={globalFilterValues.Name}
                        onChange={onGlobalFilterChange}
                        placeholder="Keyword Search"
                        className="p-2 ring-1 ring-opacity-50 ring-black focus:ring-blue-600 focus:ring-2 focus:ring-opacity-70 hover:ring-opacity-100 hover:ring-blue-400"
                    />
                </span>
            </div>
        );
    };

    const header = renderHeader();
    const [first, setFirst] = useState(0);

    const calculateIndex = (currentPage, rowIndex) => {
        return currentPage * 10 + rowIndex + 1;
    };

    return (
        <>
            <div className="justify-between">
                <Link to={"addstate"}>Add State</Link>
                <Link to={"adddistrict"}>Add District</Link>
                <Link to={"addtaluka"}>Add Taluka</Link>
                <Link to={"addcity"}>Add City</Link>
            </div>
            <div className="card p-10">
                <DataTable
                    value={customers}
                    paginator
                    showGridlines
                    stripedRows
                    rows={10}
                    rowsPerPageOptions={[10, 25, 50]}
                    loading={loading}
                    dataKey="_id"
                    filters={filters}
                    globalFilterFields={["Name", "UID", "AadharNumber", "Standard"]}
                    header={header}
                    emptyMessage="No School found."
                    removableSort
                >
                    <Column
                        field="index"
                        header="Index"
                        body={(rowData) => {
                            const rowIndex = customers.indexOf(rowData);
                            return calculateIndex(Math.floor(first / 10), rowIndex);
                        }}
                        headerStyle={{ color: "#fff", backgroundColor: "#333" }}
                        style={{ backgroundColor: "#DDE6ED" }}
                    />

                    <Column
                        sortable
                        header="State"
                        field="State"
                        filterField="State"
                        headerStyle={{ color: "#fff", backgroundColor: "#333" }}
                        style={{ backgroundColor: "#DDE6ED" }}
                    />
                    <Column
                        sortable
                        header="District"
                        field="District"
                        filterField="District"
                        headerStyle={{ color: "#fff", backgroundColor: "#333" }}
                        style={{ backgroundColor: "#DDE6ED" }}
                    />

                    <Column
                        sortable
                        header="Taluka"
                        field="Taluka"
                        filterField="Taluka"
                        headerStyle={{ color: "#fff", backgroundColor: "#333" }}
                        style={{ backgroundColor: "#DDE6ED" }}
                    />
                    <Column
                        sortable
                        header="City"
                        field="City"
                        filterField="City"
                        headerStyle={{ color: "#fff", backgroundColor: "#333" }}
                        style={{ backgroundColor: "#DDE6ED" }}
                    />
                </DataTable>
            </div>
        </>
    );
}
