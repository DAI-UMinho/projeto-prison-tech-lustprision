import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './question.reducer';
import { IQuestion } from 'app/shared/model/question.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQuestionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuestionUpdate = (props: IQuestionUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { questionEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/question');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...questionEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="lustPrisionApp.question.home.createOrEditLabel">
            <Translate contentKey="lustPrisionApp.question.home.createOrEditLabel">Create or edit a Question</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : questionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="question-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="question-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="idQuestionLabel" for="question-idQuestion">
                  <Translate contentKey="lustPrisionApp.question.idQuestion">Id Question</Translate>
                </Label>
                <AvField id="question-idQuestion" type="string" className="form-control" name="idQuestion" />
              </AvGroup>
              <AvGroup>
                <Label id="questionLabel" for="question-question">
                  <Translate contentKey="lustPrisionApp.question.question">Question</Translate>
                </Label>
                <AvField id="question-question" type="text" name="question" />
              </AvGroup>
              <AvGroup>
                <Label id="valueLabel" for="question-value">
                  <Translate contentKey="lustPrisionApp.question.value">Value</Translate>
                </Label>
                <AvField id="question-value" type="string" className="form-control" name="value" />
              </AvGroup>
              <AvGroup>
                <Label id="answerLabel" for="question-answer">
                  <Translate contentKey="lustPrisionApp.question.answer">Answer</Translate>
                </Label>
                <AvField id="question-answer" type="text" name="answer" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/question" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  questionEntity: storeState.question.entity,
  loading: storeState.question.loading,
  updating: storeState.question.updating,
  updateSuccess: storeState.question.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionUpdate);
