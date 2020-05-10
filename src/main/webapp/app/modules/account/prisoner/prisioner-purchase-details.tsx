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


const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    }
  });

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      maxWidth: '800px'
    },
    tableHeader:{
      fontWeight: 'bold'
    },
    hr:{
      marginBottom: 0,
      marginTop: 0
    }
  })
);

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  purchaseID: number;
}

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
  );
});

const CustomTableCell = withStyles((theme: Theme) => ({
  root: {
    fontWeight: 'bold',
  },
}))(TableCell);

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function subtotalC(items) {
  const total = items.reduce(function (accumulator, product) {
    return accumulator + product.priceTotal;
  }, 0);
  return total;
}

const PurchaseDetailDialog = (props: SimpleDialogProps) => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const {onClose, selectedValue, open} = props;
  // const { infoProducts, loading} = props;

  const invoiceTotal = subtotalC(items);

  useEffect(() => {
    if (open) {
      const apiEndpoint = `api/purchases/${props.purchaseID}/pres-products`;
      const request = axios.get(apiEndpoint);

      request.then(result => {
        setIsLoaded(true);
        setItems(result.data);
      });
    }
  }, [open]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <div>{error ? (<h1>SHIT</h1>) :
      (<Dialog onClose={handleClose} maxWidth={false} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Detalhes da Compra
        </DialogTitle>
        <hr className={classes.hr}/>
          {isLoaded ? (
            <TableContainer component={Paper}>
            <Table style={{minWidth: 800}} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <CustomTableCell >Nome Produto</CustomTableCell>
                  <CustomTableCell align="right">Qty.</CustomTableCell>
                  <CustomTableCell align="right">Preço/Unidade</CustomTableCell>
                  <CustomTableCell align="right">Somatório</CustomTableCell>
                </TableRow>
              </TableHead>
              {items && items.length > 0 ?
                (<TableBody>
                  {items.map((row) => (
                    <TableRow key={row.nameProd}>
                      <TableCell>{row.nameProd}</TableCell>
                      <TableCell align="right">{row.qty}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.priceTotal}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={2} />
                    <CustomTableCell colSpan={2}>Total</CustomTableCell>
                    <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                  </TableRow>
                </TableBody>) : (<TableCell align="right">NADA</TableCell>)
              }
            </Table>
          </TableContainer>
            ) : (<Ellipsis color="#99c3ff"/>)}
      </Dialog>)}
    </div>
  );
};
export default PurchaseDetailDialog;
