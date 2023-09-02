import React from "react";
import { useSession } from "next-auth/react";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
} from "@refinedev/mui";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { CrudFilters, IResourceComponentsProps, LogicalFilter, useTranslate } from "@refinedev/core";
import { UserSessionData } from "src/model/dto/userSessionData";

export const ViewstatList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const data: UserSessionData = useSession().data!;
    let filters: CrudFilters = [{field: "compcode", operator: "eq", value: data.compcode}];
    const { dataGridProps } = useDataGrid({
        meta: { fields: ["id","idsk", "compname", "viewcnt", "ins_ds"] },
        filters: {permanent: filters},
    });
 
    const columns = React.useMemo<GridColumns<any>>(
        () => [
            {
                field: "id",
                flex: 1,
                type: "number",
                headerName: translate("ID"),
                minWidth: 200,
            },
            {
                field: "idsk",
                flex: 1,
                headerName: translate("KEY"),
                minWidth: 200,
            },
            {
                field: "compname",
                flex: 1,
                headerName: translate("기업명"),
                minWidth: 200,
            },
            {
                field: "viewcnt",
                flex: 1,
                headerName: translate("뷰 건수"),
                type: "number",
                minWidth: 200,
            },
            {
                field: "ins_ds",
                flex: 1,
                headerName: translate("등록일시(YYYYMMDDHHMISS)"),
                minWidth: 200,
            },
        ],
        [translate],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
