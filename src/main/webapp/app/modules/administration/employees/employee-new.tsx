import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Label, Row} from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback } from 'availity-reactstrap-validation';
import {openFile, setFileData, Translate, translate} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { locales, languages } from 'app/config/translation';
import { getRoles, createUser, reset, setBlob } from './user-management.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IEmployeeNewProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {}

export const EmployeeNew = (props: IEmployeeNewProps) => {

  const [password, setPassword] = useState('');

  useEffect(() => {
    props.reset();
    props.getRoles();
  }, []);

  const updatePassword = event => setPassword(event.target.value);
  const { loading, updating, roles, user } = props;
  const { profileImage, profileImageContentType } = props.user;

  const handleClose = () => {
    props.history.goBack();
  };

  const saveUser = (event, values) => {
    props.createUser(values);
    handleClose();
  };

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  const isInvalid = false;

  return (
    <Row className="justify-content-center">
      <Col md="8">
        <Card className="card-user justify-content-center">
          <CardHeader>
            <CardTitle tag="h5">Criar Funcionário</CardTitle>
          </CardHeader>
          <CardBody>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm onValidSubmit={saveUser}>
                {profileImage ? (
                  <div>
                    <a onClick={openFile(profileImageContentType, profileImage)}>
                      <img src={`data:${profileImageContentType};base64,${profileImage}`}
                           className="profile-avatar-wrap"/>
                    </a>
                    <br/>
                    <Col md="1">
                      <Button color="danger" onClick={clearBlob('profileImage')}>
                        <FontAwesomeIcon icon="times-circle"/>
                      </Button>
                    </Col>
                  </div>
                ) : null}
                <Row className="row justify-content-center">
                  {!profileImage ? (
                    <div className="file-drop-area">
                      <span className="fake-btn">Choose files</span>
                      <span className="file-msg">or drag and drop files here</span>
                      <input className="file-input" id="file_profileImage" type="file"
                             onChange={onBlobChange(true, 'profileImage')} accept="image/*"/>
                      <AvInput type="hidden" name="profileImage" value={profileImage}/>
                    </div>) : null}
                </Row>
                <AvGroup>
                  <Label for="login">
                    <Translate contentKey="userManagement.login">Login</Translate>
                  </Label>
                  <AvField
                    type="text"
                    className="form-control"
                    name="login"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: translate('register.messages.validate.login.required')
                      },
                      pattern: {
                        value: '^[_.@A-Za-z0-9-]*$',
                        errorMessage: translate('register.messages.validate.login.pattern')
                      },
                      minLength: {
                        value: 1,
                        errorMessage: translate('register.messages.validate.login.minlength')
                      },
                      maxLength: {
                        value: 50,
                        errorMessage: translate('register.messages.validate.login.maxlength')
                      }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="firstName">
                    <Translate contentKey="userManagement.firstName">First Name</Translate>
                  </Label>
                  <AvField
                    type="text"
                    className="form-control"
                    name="firstName"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: translate('global.messages.validate.firstName.required')},
                      pattern: {value: '^[A-Za-z0-9]+$'},
                      maxLength: {
                        value: 50,
                      }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="lastName">
                    <Translate contentKey="userManagement.lastName">Last Name</Translate>
                  </Label>
                  <AvField
                    type="text"
                    className="form-control"
                    name="lastName"
                    validate={{
                      required: {value: true},
                      pattern: {value: '^[A-Za-z0-9]+$'},
                      maxLength: {
                        value: 50,
                        errorMessage: translate('entity.validation.maxlength', { max: 50 })
                      }
                    }}
                  />
                  <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
                </AvGroup>
                <AvGroup>
                  <AvField
                    name="email"
                    label={translate('global.form.email.label')}
                    placeholder={translate('global.form.email.placeholder')}
                    type="email"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: translate('global.messages.validate.email.required')
                      },
                      email: {
                        errorMessage: translate('global.messages.validate.email.invalid')
                      },
                      minLength: {
                        value: 5,
                        errorMessage: translate('global.messages.validate.email.minlength')
                      },
                      maxLength: {
                        value: 254,
                        errorMessage: translate('global.messages.validate.email.maxlength')
                      }
                    }}
                  />
                </AvGroup>
                <AvInput type="hidden" name="activated" value={0} />
                <AvGroup>
                  <Label for="langKey">
                    <Translate contentKey="userManagement.langKey">Language Key</Translate>
                  </Label>
                  <AvField type="select" className="form-control" name="langKey" value={ locales[0]}>
                    {locales.map(locale => (
                      <option value={locale} key={locale}>
                        {languages[locale].name}
                      </option>
                    ))}
                  </AvField>
                </AvGroup>
                <AvGroup>
                  <Label for="authorities">
                    <Translate contentKey="userManagement.profiles">Profiles</Translate>
                  </Label>
                  <AvInput type="select" className="form-control" name="authorities" multiple>
                    {roles.map(role => (
                      <option value={role} key={role}>
                        {role}
                      </option>
                    ))}
                  </AvInput>
                </AvGroup>
{/*                <AvGroup>
                  <AvField type="password" name="firstPassword"
                    placeholder={translate('global.form.newpassword.placeholder')}
                    onChange={updatePassword}
                    validate={{
                      required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
                      minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
                      maxLength: { value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength') }
                    }}
                  />
                  <PasswordStrengthBar password={password} />
                </AvGroup>
                <AvGroup>
                  <AvField type="password" name="secondPassword"
                    placeholder={translate('global.form.confirmpassword.placeholder')}
                    validate={{
                      required: { value: true, errorMessage: translate('global.messages.validate.confirmpassword.required') },
                      minLength: { value: 4, errorMessage: translate('global.messages.validate.confirmpassword.minlength') },
                      maxLength: { value: 50, errorMessage: translate('global.messages.validate.confirmpassword.maxlength') },
                      match: { value: 'firstPassword', errorMessage: translate('global.messages.error.dontmatch') }
                    }}
                  />
                </AvGroup>*/}
                <Button tag={Link} to="/dashboard/employees" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  user: storeState.userManagement.user,
  roles: storeState.userManagement.authorities,
  loading: storeState.userManagement.loading,
  updating: storeState.userManagement.updating
});

const mapDispatchToProps = { getRoles, createUser, reset, setBlob};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeNew);
