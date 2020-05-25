import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const datePicker = makeStyles((theme: Theme) =>
  createStyles({
    datePicker: {
      border: '1px solid #ced4da',
      borderRadius: '0.25rem'
    }
  })
);

export const quizTheme = makeStyles((theme: Theme) =>
  createStyles({
    droot: {
      padding: theme.spacing(3)
    },
    content: {
      marginTop: theme.spacing(2)
    },
    table: {
      minWidth: 700
    },
    row: {
      height: '42px',
      display: 'flex',
      alignItems: 'center',
      marginTop: '10px'
    },
    spacer: {
      flexGrow: 1
    },
    importButton: {
      marginRight: '10px'
    },
    exportButton: {
      marginRight: '10px'
    },
    cardBody: {
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#1571ff'
      },
      borderRadius: '12px',
      backgroundColor: '#2b5eb1'
    }
  })
);
