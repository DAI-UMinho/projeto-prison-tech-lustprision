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
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';

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
    correctAnswer:{
      backgroundColor: '#43a82a'
    },
    wrongAnswer:{
      backgroundColor: '#ca0005',
      width: '100%'
    }
  })
);

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

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  results:  readonly any[];
}

const QuizDetailDialog = (props: SimpleDialogProps) => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const {onClose, open, results} = props;


  const handleClose = () => {
    onClose(null);
  };

  console.log(results);
  return (
    <div>{error ? (<h1>SHIT</h1>) :
      (<Dialog onClose={handleClose} maxWidth={false} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Questões
        </DialogTitle>
        <DialogContent dividers>
          {true ? (
            <div>
              <TableContainer component={Paper}>
                <Table style={{minWidth: 600}} aria-label="spanning table">
                  <TableBody>
                    {results.map((result) => (
                      <>
                        <TableRow key={1}>
                          <TableCell align="left"><HelpOutlineIcon/> {result.question}</TableCell>
                        </TableRow>
                        <TableCell className={result.correct ? classes.correctAnswer : classes.wrongAnswer} align="left" component="th" scope="row">
                          {result.correct ? <CheckCircleOutlineIcon /> : <CancelIcon />}
                          {result.userAnswer}
                        </TableCell>
                        <TableRow>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
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
export default QuizDetailDialog;
