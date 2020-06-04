import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme, useTheme, withStyles, WithStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import {AvForm, AvField, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {Column} from "material-table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {translate, Translate} from "react-jhipster";
import {Button} from "@material-ui/core";
import {IPrisioner} from "app/shared/model/prisioner.model";
import {cleanEntity} from "app/shared/util/entity-utils";
import {Alert} from 'reactstrap';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      minWidth: '550px'
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
      maxWidth: '800px',
      minWidth: '550px'
    },
    root: {
      margin: 0,
      padding: theme.spacing(2),
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
  )
});

interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  prisoner: IPrisioner;
}

const PrisonerCredits = (props: SimpleDialogProps) => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const {onClose, open, prisoner} = props;

  const handleClose = () => {
    onClose('');
  };

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      if(values['credits'] <= prisoner.balance){
        setError(false);
        const entity = {
          ...prisoner,
          ['balance']: (prisoner['balance'] - values['credits'])
        };
        const apiEndpoint = `api/prisioners/update-credits`;
        const request = axios.put(apiEndpoint, cleanEntity(entity));
        request.then(value => setUpdated(true));
      }else{
        setError(true);
      }
    }
  };

  return (
    <div>
      <Dialog onClose={handleClose} maxWidth={false} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Penalizar Presidiário
        </DialogTitle>
        <hr className={classes.hr}/>
        <div className={classes.root}>
          <AvForm onSubmit={saveEntity}>
            <AvGroup>
              Créditos a Retirar
              <AvField id="prisioner-credits" type="text" name="credits"
                       validate={{
                         number: true,
                         required: {
                           value: true,
                           errorMessage: translate('lustPrisionApp.prisioner.validation.balance.required')
                         },
                         minLength: {
                           value: 1,
                           errorMessage: translate('lustPrisionApp.prisioner.validation.balance.length')
                         },
                         maxLength: {
                           value: 5,
                           errorMessage: translate('lustPrisionApp.prisioner.validation.balance.length')
                         },
                         min: {value: 1},
                         max: {value: 99999}
                       }}/>
            </AvGroup>
            {error ? (
              <Alert color="danger">
                  <strong>O numero de creditos a retirar é superior ao numero de crédtos atual</strong>
              </Alert>
            ) : null}
            {updated ? (
              <Alert color="success">
                <strong>Créditos atualizados com sucesso</strong>
              </Alert>
            ) : null}
            <Button color="primary" id="save-entity" type="submit">
              <FontAwesomeIcon icon="save"/>
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
          </AvForm>
        </div>
      </Dialog>
    </div>
  );
};
export default PrisonerCredits;
