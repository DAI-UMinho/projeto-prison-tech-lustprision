import React, {useEffect, useState} from 'react';
import {makeStyles, useTheme, Theme, createStyles} from '@material-ui/core/styles';
import MaterialTable, {Column} from "material-table";
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import TableIcon from "app/shared/util/table-icon";

export interface SimpleDialogProps {
  open: boolean,
  loading: boolean,
  data: any,
  onClose: (value?: any) => void;
}

interface TableState {
  columns: Array<Column<any>>;
}

const WorkSubDialog = (props: SimpleDialogProps) => {
  // const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const {onClose, open, data, loading} = props;

  const [state, setState] = React.useState<TableState>({
    columns: [
      {
        title: 'Name', field: 'name',
        render: rowData =>
          <div>
            <img src={`data:${rowData.profileImageContentType};base64,${rowData.profileImage}`}
                 className="prisoner-image"/>
            <p style={{paddingTop: 15}}>{rowData.name}</p>
          </div>
      },
    ]
  });

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: any) => {
    onClose(value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MaterialTable
        title=""
        icons={TableIcon}
        columns={state.columns}
        data={data}
        isLoading={loading}
        options={{
          headerStyle: {
            fontWeight: 'bold'
          },
          actionsColumnIndex: -1
        }}
        localization={{
          body: {
            emptyDataSourceMessage: "Não existem presidiários",
          }
        }}
        onRowClick={((evt, selectedRow) => {
          handleListItemClick(selectedRow);
        })}
      />
    </Dialog>
  )
};

export default WorkSubDialog;
