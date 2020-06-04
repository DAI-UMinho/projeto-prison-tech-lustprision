import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme, useTheme, withStyles, WithStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Ellipsis } from 'react-spinners-css';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import TableIcon from "app/shared/util/table-icon";
import MaterialTable, {Column} from "material-table";
import {LogBox, StateBox} from "app/components/StateBox";
import {logs} from "app/shared/layout/themes/themes";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      minWidth: '550px'
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    }
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const {children, classes, onClose, ...other} = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
});

interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  productID: number;
}

interface TableState {
  columns: Array<Column<any>>;
}

const ProductLogs = (props: SimpleDialogProps) => {
  const classes = logs();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const {onClose, open} = props;

  const [state, setState] = React.useState<TableState>({
    columns: [
      {title: 'Operação', field: 'operation',
        render: rowData => <LogBox operationType={rowData.revType}/>},
      {title: 'Responsável', field: 'lastModifiedBy'},
      {title: 'Data', field: 'lastModifiedDate', type: 'datetime'}
    ]
  });

  useEffect(() => {
    if (open) {
      const apiEndpoint = `api/products/${props.productID}/logs`;
      const request = axios.get(apiEndpoint);

      request.then(result => {
        setIsLoaded(true);
        setItems(result.data);
        console.log(result.data);
      });
    }
  }, [open]);

  const handleClose = () => {
    onClose('');
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <div>{error ? (<h1></h1>) :
      (<Dialog onClose={handleClose} maxWidth={false} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Logs do Produto
        </DialogTitle>
        <hr className={classes.hr}/>
        {isLoaded ? (
          <MaterialTable
            icons={TableIcon}
            title=""
            columns={state.columns}
            data={items}
            isLoading={!isLoaded}
            localization={{
              body: {
                emptyDataSourceMessage: "Não existem despedimentos neste trabalho",
              }
            }}
            options={{
              search: false,
              toolbar: false,
              headerStyle: {
                fontWeight: 'bold',
              },
              actionsColumnIndex: -1
            }}
          />
        ) : (<Ellipsis color="#99c3ff"/>)}
      </Dialog>)}
    </div>
  );
};
export default ProductLogs;
