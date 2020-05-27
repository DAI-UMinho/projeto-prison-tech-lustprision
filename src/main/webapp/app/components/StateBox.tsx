import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      marginLeft: theme.spacing(1),
      flex: 2,
    },
    iconButton: {
      padding: 10,
    },
    base:{
      height:' 20px',
      display: 'inline-flex',
      padding: '4px 8px',
      flexGrow: 0,
      fontSize: '10px',
      minWidth: '20px',
      alignItems: 'center',
      flexShrink: 0,
      lineHeight: '10px',
      whiteSpace: 'nowrap',
      borderRadius: '2px',
      justifyContent: 'center',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700
    },
    quizBase:{
      height:' 28px',
      display: 'inline-flex',
      padding: '4px 8px',
      flexGrow: 0,
      fontSize: '14px',
      minWidth: '20px',
      alignItems: 'center',
      flexShrink: 0,
      lineHeight: '10px',
      whiteSpace: 'nowrap',
      borderRadius: '2px',
      justifyContent: 'center',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700
    },
    pending: {
      border: '1px solid rgb(227,167,67)',
      color: 'rgb(227,167,67)',
    },
    completed: {
      border: '1px solid rgb(67, 160, 71)',
      color: 'rgb(67, 160, 71)',
    },
    canceled: {
      border: '1px solid rgb(203,0,15)',
      color: 'rgb(203,0,15)',
    },
    updated: {
      border: '1px solid rgb(30,115,203)',
      color: 'rgb(30,115,203)',
    },
  }),
);

interface StateBoxState{
  boxText: string;
  stateID: number
}

interface QuizBoxState{
  correctAnswers: number
  nQuestions: number
}

interface LogBoxState{
  operationType: string
}

export const StateBox = (props: StateBoxState) => {
  const classes = useStyles();
  const { boxText, stateID } = props;

  const getColorByState = (id) => {
    switch (id) {
      case 0:
      case 1:
        return classes.pending;
      case 2:
        return classes.completed;
      case 3:
        return classes.canceled;
      default:
        return classes.pending;
    }
  };

  return (
    <span className={`${classes.base} ${getColorByState(stateID)}`}>
      {boxText}
    </span>
  );
};

export const QuizBox = (props: QuizBoxState) => {
  const classes = useStyles();
  const { correctAnswers, nQuestions } = props;

  const getColorByCorrectAnswers = (id) => {
    switch (id) {
      case 0:
      case 1:
      case 2:
        return classes.canceled;
      case 3:
      case 4:
        return classes.pending;
      case 5:
        return classes.completed;
      default:
        return classes.canceled;
    }
  };

  return (
    <span className={`${classes.quizBase} ${getColorByCorrectAnswers(correctAnswers)}`}>
      {`${correctAnswers}  /  ${nQuestions}`}
    </span>
  );
};

export const LogBox = (props: LogBoxState) => {
  const classes = useStyles();
  const { operationType } = props;

  const getColorByOperation = (id) => {
    switch (id) {
      case 'ADD':
        return classes.completed;
      case 'DEL':
        return classes.canceled;
      case 'MOD':
        return classes.updated;
      default:
        return classes.updated;
    }
  };

  const getTextByOperation = (id) => {
    switch (id) {
      case 'ADD':
        return 'CREATE';
      case 'DEL':
        return 'DELETE';
      case 'MOD':
        return 'UPDATE';
      default:
        return 'UPDATE';
    }
  };

  return (
    <span className={`${classes.quizBase} ${getColorByOperation(operationType)}`}>
      {getTextByOperation(operationType)}
    </span>
  );
};
