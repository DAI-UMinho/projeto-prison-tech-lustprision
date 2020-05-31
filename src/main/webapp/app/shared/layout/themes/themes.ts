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

export const logs = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      maxWidth: '800px',
      minWidth: '550px'
    },
    tableHeader: {
      fontWeight: 'bold'
    },
    hr: {
      marginBottom: 0,
      marginTop: 0
    }
  })
);

export const logPages = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      background: 'transparent',
      boxShadow: 'none',
      color: '#000000'
    },
    table: {
      minWidth: 700
    },
    textStyle: {
      fontWeight: 'bold'
    },
    margin: {
      margin: theme.spacing(1),
      float: 'right'
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    },
    logButton: {
      marginBottom: 10,
      marginRight: 20
    }
  })
);

export const productPage = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      width: '100%',
      overflow: 'hidden',
      [theme.breakpoints.down('md')]: {
        marginTop: '20px'
      }
    },
    gridPrice: {
      color: 'rgb(255,255,255)',
      margin: '10px'
    },
    productWrapper: {
      width: '100%',
      [theme.breakpoints.up('xs')]: {
        display: 'grid'
      },
      [theme.breakpoints.up('lg')]: {
        display: 'flex'
      }
    },
    gridItem: {
      borderRadius: 10,
      '&:hover': {
        cursor: 'pointer'
      }
    },
    loadingSpinner: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    sidebarFilter: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      padding: '15px 25px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'rgb(233, 233, 233)',
      borderImage: 'initial',
      borderRadius: '3px'
    },
    sidebar: {
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      transition: 'all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s',
      [theme.breakpoints.up('lg')]: {
        margin: '0px 30px 0px 0px',
        width: '240px'
      },
      [theme.breakpoints.up('xl')]: {
        margin: '0px 30px 0px 0px',
        width: '340px'
      }
    },
    filter: {
      fontSize: '14px',
      fontWeight: 700,
      color: 'rgb(50, 51, 50)',
      lineHeight: 1.3,
      display: 'flex',
      margin: '0px 0px 20px'
    },
    pagination: {
      marginTop: '10px'
    },
    sliderLabel: {
      marginLeft: '60px'
    },
    customImageStyle: {
      top: '0',
      height: '100%',
      width: '100%',
      transform: 'translateX(-50%)',
      position: 'relative',
      left: '50%'
    }
  })
);
