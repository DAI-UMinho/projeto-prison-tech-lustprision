import {Link, RouteComponentProps} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {IRootState} from "app/shared/reducers";
import {getEntities as getLogins} from "app/entities/login/login.reducer";
import {getEntities as getPermissions} from "app/entities/permission/permission.reducer";

import {getPrisonerPurchases, getEntity, getPrisionerWorks} from "./prisioner.reducer";
import {connect} from "react-redux";
import PrisionerInfo from "app/modules/account/prisoner/prisioner-info";
import PrivateRoute from "app/shared/auth/private-route";
import {PrisionerDetail} from "app/entities/prisioner/prisioner-detail";
import {PrisionerWork} from "app/modules/account/prisoner/prisioner-work";
import {PrisionerPurchase} from "app/modules/account/prisoner/prisioner-purchase";

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

const useStyles = makeStyles({
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
  }
});

export const PrisonerUpdate = (props: IPrisionerUpdateProps) => {
  const [loginId, setLoginId] = useState('0');
  const [permissionId, setPermissionId] = useState('0');
  const [purchaseData, setPurchaseData] = useState([]);
  const [workData, setWorkData] = useState([]);
  const [value, setValue] = React.useState(0);

/*  const {logins, permissions, prisionerPurchases, match} = props;*/
  const {prisionerEntity, prisionerPurchases, loading, updating} = props;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
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
  }, [props.prisionerWorks]);

/*  useEffect(() => {
    if (props.prisionerPurchases && props.prisionerPurchases.length > 0) {
      setPurchaseData(props.prisionerPurchases.concat);
    }
  }, [props.prisionerPurchases]);*/

  useEffect(() => {
    props.getEntity(props.match.params.id);
    props.getPrisionerWorks(props.match.params.id);
    props.getPrisonerPurchases(props.match.params.id);
  }, []);

  function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other } = props;

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
        <Tabs value={value} onChange={handleChange} TabIndicatorProps={{style: {
            backgroundColor: "#2196f3"}}} aria-label="simple tabs example">
          <Tab className={classes.textStyle} label="Dados Pessoais" {...a11yProps(0)} />
          <Tab className={classes.textStyle} label="Trabalhos" {...a11yProps(1)} />
          <Tab className={classes.textStyle} label="Compras" {...a11yProps(2)} />
          <Tab className={classes.textStyle} label="Quizes" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PrisionerInfo {...props} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PrisionerWork {...props} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PrisionerPurchase {...props} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Three
      </TabPanel>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
/*  logins: storeState.login.entities,
  permissions: storeState.permission.entities,*/
  prisionerPurchases: storeState.prisioner.purchases,
  prisionerEntity: storeState.prisioner.entity,
  prisionerWorks: storeState.prisioner.works,
  loading: storeState.prisioner.loading,
  updating: storeState.prisioner.updating,
  updateSuccess: storeState.prisioner.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  getPrisonerPurchases,
  getPrisionerWorks,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrisonerUpdate);
