import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme, useTheme, withStyles, WithStyles} from '@material-ui/core/styles';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField} from 'availity-reactstrap-validation';
import {Label} from 'reactstrap'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import {translate, Translate} from "react-jhipster";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {createEntity, updateEntity} from "app/modules/products/seller.reducer";
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";


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
      maxWidth: '800px',
    },
    tableHeader:{
      fontWeight: 'bold'
    }
  })
);

export interface SimpleDialogProps extends StateProps, DispatchProps {
  open: boolean;
  seller?: any,
  onClose: (value: string) => void;
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
    minWidth: '400px'
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

const SellerUpdate = (props: SimpleDialogProps) => {
  const classes = useStyles();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const {onClose, seller, open} = props;

  const [isNew, setIsNew] = useState();

  const handleClose = () => {
    onClose('a');
  };

  useEffect(() => {
    if(open){
      setIsNew(seller === undefined);
    }
  }, [open]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...seller,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
      <Dialog onClose={handleClose} maxWidth={false} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {isNew ? "Criar Vendedor" : "Editar Vendedor"}
        </DialogTitle>
        <DialogContent dividers>
          <AvForm model={isNew ? {} : seller} onSubmit={saveEntity}>
            {!isNew ? (
              <AvGroup>
                <Label for="seller-id">
                  <Translate contentKey="global.field.id">ID</Translate>
                </Label>
                <AvInput id="seller-id" type="text" className="form-control" name="id" required readOnly />
              </AvGroup>
            ) : null}
            <AvGroup>
              <Label id="nameLabel" for="question-wrongAnswer1">
                Nome do Vendedor
              </Label>
              <AvField id="seller-name" type="text" name="name"
                       validate={{
                         required: {
                           value: true,
                           errorMessage: translate('lustPrisionApp.question.validate.required')
                         }
                       }}/>
            </AvGroup>
            &nbsp;
            <Button style={{float: 'right'}} color="primary" id="save-entity" type="submit">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
          </AvForm>
        </DialogContent>
      </Dialog>
  );
};

const mapStateToProps = ({seller}: IRootState) => ({
  updating: seller.updating
});

const mapDispatchToProps = {createEntity, updateEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SellerUpdate);
