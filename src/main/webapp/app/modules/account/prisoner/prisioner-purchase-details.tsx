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

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const CustomTableCell = withStyles((theme: Theme) => ({
  root: {
    fontWeight: 'bold',
  },
}))(TableCell);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

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
      console.log("PURCHASE ID: " + props.purchaseID);
      const apiEndpoint = `http://localhost:8080/api/purchases/${props.purchaseID}/pres-products`;

      fetch(apiEndpoint)
        .then(res => res.json())
        .then((result) => {
            console.log("SUCESSSSO");
            console.log(result);
            setIsLoaded(true);
            setItems(result)
          },
          (error) => {
            console.log("ERRO");
            setIsLoaded(true);
            setError(error);
          })
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
        <DialogContent dividers>
          {isLoaded ? (
            <TableContainer component={Paper}>
            <Table style={{minWidth: 800}} aria-label="spanning table">
              <TableHead>
                <TableRow className={classes.tableHeader}>
                  <TableCell align="center" colSpan={3}>
                    Details
                  </TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
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
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>)}
    </div>
  );
};

/*const mapStateToProps = ({purchase}: IRootState) => ({
  infoProducts: purchase.infoProducts,
  loading: purchase.loading,
  updateSuccess: purchase.updateSuccess
});

const mapDispatchToProps = {getPurchaseProductInfoList};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseDetailDialog);*/
export default PurchaseDetailDialog;
