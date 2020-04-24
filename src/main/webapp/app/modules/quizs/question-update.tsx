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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Ellipsis } from 'react-spinners-css';
import Paper from '@material-ui/core/Paper';
import {Translate} from "react-jhipster";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {createEntity, updateEntity} from "app/modules/quizs/question.reducer";
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
  question?: any,
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

const QuestionUpdate = (props: SimpleDialogProps) => {
  const classes = useStyles();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const {onClose, question, open} = props;

  const [isNew, setIsNew] = useState(question.answer ? false : true);

  const handleClose = () => {
    onClose('a');
  };

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...question,
        ...values
      };

      if (isNew) {
        console.log("Creating...");
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  console.log(isNew);

  return (
      <Dialog onClose={handleClose} maxWidth={false} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {isNew ? "Criar Questão" : "Editar Questão"}
        </DialogTitle>
        <DialogContent dividers>
          <AvForm model={isNew ? {} : question} onSubmit={saveEntity}>
            {!isNew ? (
              <AvGroup>
                <Label for="question-id">
                  <Translate contentKey="global.field.id">ID</Translate>
                </Label>
                <AvInput id="question-id" type="text" className="form-control" name="id" required readOnly />
              </AvGroup>
            ) : null}
            <AvGroup>
              <Label id="questionLabel" for="question-question">
                <Translate contentKey="lustPrisionApp.question.question">Question</Translate>
              </Label>
              <AvField id="question-question" type="text" name="question" />
            </AvGroup>
            <AvGroup>
              <Label id="answerLabel" for="question-answer">
                <Translate contentKey="lustPrisionApp.question.answer">Answer</Translate>
              </Label>
              <AvField id="question-answer" type="text" name="answer" />
            </AvGroup>
            &nbsp;
            <Button color="primary" id="save-entity" type="submit">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
          </AvForm>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
  );
};

const mapStateToProps = ({question}: IRootState) => ({
  updating: question.updating
});

const mapDispatchToProps = {createEntity, updateEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionUpdate);
