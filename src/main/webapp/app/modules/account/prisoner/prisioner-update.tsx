import {Link, RouteComponentProps} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {withStyles, makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {IRootState} from "app/shared/reducers";

import {getPrisonerPurchases, getEntity, getPrisionerWorks, getPrisionerQuizs} from "./prisioner.reducer";
import {cancelPressProduct} from "app/modules/account/prisoner/press-work.reducer";
import {deleteQuiz} from "app/modules/quizs/quiz.reducer";
import {connect} from "react-redux";
import PrisionerInfo from "app/modules/account/prisoner/prisioner-info";
import PrivateRoute, {hasAnyAuthority} from "app/shared/auth/private-route";
import {PrisionerDetail} from "app/entities/prisioner/prisioner-detail";
import {PrisionerWork} from "app/modules/account/prisoner/prisioner-work";
import {PrisionerPurchase} from "app/modules/account/prisoner/prisioner-purchase";
import {PrisionerQuiz} from "app/modules/account/prisoner/prisioner-quiz";
import {getPrisonerWorkStates} from "app/shared/reducers/statistics";
import {IWorkStats} from "app/shared/model/prisoner.work.stats";
import {IPurchaseData} from "app/shared/model/prisoner.purchase.data";
import {IPrisonerQuiz} from "app/shared/model/prisoner.quiz";
import {read} from "fs";
import {IWork} from "app/shared/model/work.model";
import {getQuizResults} from "app/modules/quizs/quiz.reducer";
import {Fab} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import {AUTHORITIES} from "app/config/constants";
import authentication from "app/shared/reducers/authentication";
import PrisonerLogs from "app/modules/account/prisoner/prisioner-logs";
import EventNoteIcon from '@material-ui/icons/EventNote';

interface TabPanelProps {
  children?: any;
  index: any;
  value: any;
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export interface IPrisionerUpdateProps extends TabPanelProps, StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  appbar: {
    background: 'transparent',
    boxShadow: 'none',
    color: "#000000",
  },
  table: {
    minWidth: 700,
  },
  textStyle: {
    fontWeight: 'bold'
  },
  margin: {
    margin: theme.spacing(1),
    float: 'right'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const PrisonerUpdate = (props: IPrisionerUpdateProps) => {
  const [loginId, setLoginId] = useState('0');
  const [permissionId, setPermissionId] = useState('0');
  const [purchaseData, setPurchaseData] = useState<readonly IPurchaseData[]>();
  const [workData, setWorkData] = useState<readonly IWork[]>([]);
  const [quizData, setQuizDate] = useState<readonly IPrisonerQuiz[]>([]);
  const [mValue, setValue] = React.useState(0);
  const [open, setOpen] = useState(false);

/*  const {logins, permissions, prisionerPurchases, match} = props;*/
  const {prisionerEntity, prisionerPurchases, prisionerQuizs, loading, updating, isAdmin} = props;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (props.prisionerPurchases && props.prisionerPurchases.length > 0) {
      setPurchaseData(props.prisionerPurchases);
    }
  }, [props.prisionerPurchases]);

  useEffect(() => {
    if (props.prisionerWorks && props.prisionerWorks.length > 0) {
      setWorkData(props.prisionerWorks);
    }
    props.getPrisonerWorkStates(props.match.params.id);
  }, [props.prisionerWorks]);


  useEffect(() => {
    if (props.prisionerQuizs && props.prisionerQuizs.length > 0) {
      setQuizDate(props.prisionerQuizs);
    }
  }, [props.prisionerQuizs]);

  useEffect(() => {
    props.getEntity(props.match.params.id);
    props.getPrisionerWorks(props.match.params.id);
    props.getPrisonerPurchases(props.match.params.id);
    props.getPrisionerQuizs(props.match.params.id);
    props.getPrisonerWorkStates(props.match.params.id);
  }, []);

  function TabPanel(tabProps: TabPanelProps) {
    const {children, value, index, ...other } = tabProps;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.appbar} position="static">
        <Tabs value={mValue} onChange={handleChange} TabIndicatorProps={{style: {
            backgroundColor: "#2196f3"}}} aria-label="simple tabs example">
          <Tab className={classes.textStyle} label="Dados Pessoais" {...a11yProps(0)} />
          <Tab className={classes.textStyle} label="Trabalhos" {...a11yProps(1)} />
          <Tab className={classes.textStyle} label="Compras" {...a11yProps(2)} />
          <Tab className={classes.textStyle} label="Quizes" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      {isAdmin &&
      <Fab aria-label="edit"
           variant="extended"
           size="medium"
           color="primary"
           className={classes.margin}
           onClick={() => setOpen(true)}>
        <EventNoteIcon className={classes.extendedIcon}/>
        Logs
      </Fab>}
      <TabPanel value={mValue} index={0}>
        <PrisionerInfo {...props} />
      </TabPanel>
      <TabPanel value={mValue} index={1}>
        <PrisionerWork {...props} />
      </TabPanel>
      <TabPanel value={mValue} index={2}>
        <PrisionerPurchase {...props} />
      </TabPanel>
      <TabPanel value={mValue} index={3}>
        <PrisionerQuiz {...props}/>
      </TabPanel>
      <PrisonerLogs  open={open} prisonerID={prisionerEntity.id} onClose={handleDialogClose}/>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
/*  logins: storeState.login.entities,
  permissions: storeState.permission.entities,*/
  prisionerPurchases: storeState.prisioner.purchases,
  prisionerEntity: storeState.prisioner.entity,
  prisionerWorks: storeState.prisioner.works,
  prisionerQuizs: storeState.prisioner.quizzes,
  // completedWorks: storeState.statistics.nPrisonerCompletedWork,
  workStats: storeState.statistics.prisonerWorkStats,
  loading: storeState.prisioner.loading,
  updating: storeState.prisioner.updating,
  updateSuccess: storeState.prisioner.updateSuccess,
  quizResults: storeState.quiz.quizResults,
  resultLoading: storeState.quiz.loading,
  isAdmin: hasAnyAuthority(storeState.authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = {
  getEntity,
  getPrisonerPurchases,
  getPrisionerWorks,
  getPrisionerQuizs,
  cancelPressProduct,
  getPrisonerWorkStates,
  getQuizResults,
  deleteQuiz
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrisonerUpdate);
