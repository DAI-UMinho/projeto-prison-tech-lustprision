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

  }),
);

interface StateBoxState{
  boxText: string;
  stateID: number
}

const StateBox = (props: StateBoxState) => {
  const classes = useStyles();
  const { boxText, stateID } = props;

  const getColorByState = (id) => {
    switch (id) {
      case 1:
        return classes.pending;
      case 2:
        return classes.completed;
      case 3:
        return classes.canceled;
    }
  };

  return (
    <span className={`${classes.base} ${getColorByState(stateID)}`}>
      {boxText}
    </span>
  );
};

export default StateBox;
