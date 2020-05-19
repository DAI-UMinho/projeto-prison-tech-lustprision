import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme, useTheme, withStyles, WithStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { Ellipsis } from 'react-spinners-css';
import Paper from '@material-ui/core/Paper';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
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
    correctAnswer:{
      backgroundColor: 'rgb(67, 168, 42, 0.7)',
      color: '#fff'
    },
    wrongAnswer:{
      backgroundColor: 'rgb(202, 0, 5, 0.7)',
      color: '#fff'
    },
    questionAnswer:{
      display: 'flex',
      color: '#fff',
    },
    answerIcon:{
      marginRight: 10
    },
    hr:{
      marginBottom: 0,
      marginTop: 0
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

const CustomTableCell = withStyles((theme: Theme) => ({
  root: {
    fontWeight: 'bold',
  },
}))(TableCell);

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  quizID: number;
}

const QuizDetailDialog = (props: SimpleDialogProps) => {
  const classes = useStyles();

  const [isLoaded, setIsLoaded] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [error, setError] = useState(null);
  const {onClose, open} = props;

  const handleClose = () => {
    onClose(null);
  };

  useEffect(() => {
    if (open) {
      console.log(props.quizID);
      const apiEndpoint = `api/quizzes/${props.quizID}/results`;
      const request = axios.get(apiEndpoint);

      request.then(result => {
        console.log("FINISH");
        console.log(result.data);
        setIsLoaded(true);
        setQuizData(result.data);
      });
    }
  }, [open]);

  return (
    <div>{error ? (<h1>SHIT</h1>) :
      (<Dialog onClose={handleClose} maxWidth={false} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>Resultado do Quiz</DialogTitle>
        <hr className={classes.hr}/>
        {isLoaded ? (
          <div>
            <TableContainer component={Paper}>
              <Table style={{minWidth: 400}} aria-label="spanning table">
                <TableBody>
                  {quizData.map((result) => (
                    <>
                      <TableRow key={1}>
                        <CustomTableCell align="left"><HelpOutlineIcon/> {result.question}</CustomTableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={result.correct ? classes.correctAnswer : classes.wrongAnswer} align="left" >
                          {result.correct ? <CheckCircleOutlineIcon /> : <HighlightOffIcon />} {` ${result.userAnswer}`}
                        </TableCell>
                        <TableCell align="right" className={result.correct ? classes.correctAnswer : classes.wrongAnswer}>
                          {!result.correct &&
                          <div className={classes.questionAnswer}>
                            <QuestionAnswerIcon className={classes.answerIcon}/>
                            <p>{result.questionAnswer}</p>
                          </div>
                          }
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (<Ellipsis color="#99c3ff"/>)}
      </Dialog>)}
    </div>
  );
};

export default QuizDetailDialog;
