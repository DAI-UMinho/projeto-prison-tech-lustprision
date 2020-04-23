import React, {useEffect, useState} from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import MaterialTable, {Column} from "material-table";
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";

export interface SimpleDialogProps {
  open: boolean,
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

  const {onClose, open, data} = props;

  const [state, setState] = React.useState<TableState>({
    columns: [
      {
        title: 'Name', field: 'name',
        render: rowData =>
          <div>
            <img src={`data:${rowData.profileImageContentType};base64,${rowData.profileImage}`}
                 style={{width: 50, borderRadius: '50%', float: 'left', marginRight: 10}}/>
            <p style={{paddingTop: 15}}>{rowData.name}</p>
          </div>
      },
    ]
  });

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"Subscrever novo Presidiário"}</DialogTitle>
        <DialogContent>
          <MaterialTable
            title=""
            columns={state.columns}
            data={data}
            isLoading={!setIsLoaded}
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
            onRowClick={((evt, selectedRow) =>{
              handleListItemClick(selectedRow);
            })}
          />
        </DialogContent>
      </Dialog>)
};

export default WorkSubDialog;
