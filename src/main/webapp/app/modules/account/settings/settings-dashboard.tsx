import "app/assets/css/paper-dashboard.css"
import React, {useEffect, useState} from "react";
import {AvForm, AvField} from 'availity-reactstrap-validation';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import {IRootState} from "app/shared/reducers";
import {getSession} from "app/shared/reducers/authentication";
import {reset, saveAccountSettings} from "app/modules/account/settings/settings.reducer";
import {savePassword} from "app/modules/account/password/password.reducer";
import {connect} from "react-redux";

export interface IUserSettingsProps extends StateProps, DispatchProps {
}

import userProfile from "app/assets/img/mike.jpg";
import userBack from "app/assets/img/damir-bosnjak.jpg";
import {Translate, translate} from "react-jhipster";
import PasswordStrengthBar from "app/shared/layout/password/password-strength-bar";
import {languages, locales} from "app/config/translation";

const User = (props: IUserSettingsProps) => {

  const [password, setPassword] = useState('');

  useEffect(() => {
    props.getSession();
    return () => {
      props.reset();
    };
  }, []);

  const handleValidPasswordSubmit = (event, values) => {
    props.savePassword(values.currentPassword, values.newPassword);
  };

  const handleValidPerfilSubmit = (event, values) => {
    const account = {
      ...props.account,
      ...values
    };
    console.log(values);
    console.log(account);
    props.saveAccountSettings(account);
    event.persist();
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
      <Row>
        <Col md="4">
          <Card className="card-user">
            <div className="image">
              <img
                alt="..."
                src={userBack}
              />
            </div>
            <CardBody>
              <div className="author">
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img
                    alt="..."
                    className="avatar border-gray"
                    src={userProfile}
                  />
                  <h5 className="title">{props.account.firstName} {props.account.lastName}</h5>
                </a>
                <p className="description">@{props.account.login}</p>
              </div>
            </CardBody>
            <CardFooter>
              <hr/>
              <div className="button-container">
                <Row>
                  <Col className="ml-auto" lg="3" md="6" xs="6">
                    <h5>
                      12 <br/>
                      <small>Files</small>
                    </h5>
                  </Col>
                  <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                    <h5>
                      2GB <br/>
                      <small>Used</small>
                    </h5>
                  </Col>
                  <Col className="mr-auto" lg="3">
                    <h5>
                      24,6$ <br/>
                      <small>Spent</small>
                    </h5>
                  </Col>
                </Row>
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Team Members</CardTitle>
            </CardHeader>
            <CardBody>
              <ul className="list-unstyled team-members">
                <li>
                  <Row>
                    <Col md="2" xs="2">
                      <div className="avatar">
                        <img
                          alt="..."
                          className="img-circle img-no-padding img-responsive"
                          /*src={require("assets/img/faces/ayo-ogunseinde-2.jpg")}*/
                        />
                      </div>
                    </Col>
                    <Col md="7" xs="7">
                      DJ Khaled <br/>
                      <span className="text-muted">
                            <small>Offline</small>
                          </span>
                    </Col>
                    <Col className="text-right" md="3" xs="3">
                      <Button
                        className="btn-round btn-icon"
                        color="success"
                        outline
                        size="sm"
                      >
                        <i className="fa fa-envelope"/>
                      </Button>
                    </Col>
                  </Row>
                </li>
                <li>
                  <Row>
                    <Col md="2" xs="2">
                      <div className="avatar">
                        <img
                          alt="..."
                          className="img-circle img-no-padding img-responsive"
                          /*src={require("assets/img/faces/joe-gardner-2.jpg")}*/
                        />
                      </div>
                    </Col>
                    <Col md="7" xs="7">
                      Creative Tim <br/>
                      <span className="text-success">
                            <small>Available</small>
                          </span>
                    </Col>
                    <Col className="text-right" md="3" xs="3">
                      <Button
                        className="btn-round btn-icon"
                        color="success"
                        outline
                        size="sm"
                      >
                        <i className="fa fa-envelope"/>
                      </Button>
                    </Col>
                  </Row>
                </li>
                <li>
                  <Row>
                    <Col md="2" xs="2">
                      <div className="avatar">
                        <img
                          alt="..."
                          className="img-circle img-no-padding img-responsive"
                          /*src={require("assets/img/faces/clem-onojeghuo-2.jpg")}*/
                        />
                      </div>
                    </Col>
                    <Col className="col-ms-7" xs="7">
                      Flume <br/>
                      <span className="text-danger">
                            <small>Busy</small>
                          </span>
                    </Col>
                    <Col className="text-right" md="3" xs="3">
                      <Button
                        className="btn-round btn-icon"
                        color="success"
                        outline
                        size="sm"
                      >
                        <i className="fa fa-envelope"/>
                      </Button>
                    </Col>
                  </Row>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Col>
        <Col md="8">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Edit Profile</CardTitle>
            </CardHeader>
            <CardBody>
              <AvForm id="settings-form" onValidSubmit={handleValidPerfilSubmit}>
                {/* First name */}
                <div className="row">
                  <div className="pr-1 col-md-6">
                    <AvField
                      className="form-control"
                      name="firstName"
                      label={translate('settings.form.firstname')}
                      id="firstName"
                      placeholder={translate('settings.form.firstname.placeholder')}
                      validate={{
                        required: {
                          value: true,
                          errorMessage: translate('settings.messages.validate.firstname.required')
                        },
                        minLength: {
                          value: 1,
                          errorMessage: translate('settings.messages.validate.firstname.minlength')
                        },
                        maxLength: {
                          value: 50,
                          errorMessage: translate('settings.messages.validate.firstname.maxlength')
                        }
                      }}
                      value={props.account.firstName}
                    />
                  </div>
                  {/* Last name */}
                  <div className="pl-1 col-md-6">
                    <AvField
                      className="form-control"
                      name="lastName"
                      label={translate('settings.form.lastname')}
                      id="lastName"
                      placeholder={translate('settings.form.lastname.placeholder')}
                      validate={{
                        required: {
                          value: true,
                          errorMessage: translate('settings.messages.validate.lastname.required')
                        },
                        minLength: {
                          value: 1,
                          errorMessage: translate('settings.messages.validate.lastname.minlength')
                        },
                        maxLength: {
                          value: 50,
                          errorMessage: translate('settings.messages.validate.lastname.maxlength')
                        }
                      }}
                      value={props.account.lastName}
                    />
                  </div>
                </div>
                {/* Email */}
                <div className="row">
                  <div className="pr-1 col-md-6">
                    <AvField
                      name="email"
                      label={translate('global.form.email.label')}
                      placeholder={translate('global.form.email.placeholder')}
                      type="email"
                      validate={{
                        required: {value: true, errorMessage: translate('global.messages.validate.email.required')},
                        minLength: {value: 5, errorMessage: translate('global.messages.validate.email.minlength')},
                        maxLength: {value: 254, errorMessage: translate('global.messages.validate.email.maxlength')}
                      }}
                      value={props.account.email}
                    />
                  </div>
                  <div className="pl-1 col-md-6">
                    <AvField
                      name="login"
                      label={translate('global.form.email.label')}
                      placeholder={translate('global.form.email.placeholder')}
                      type="login"
                      validate={{
                        required: {value: true, errorMessage: translate('global.messages.validate.email.required')},
                        minLength: {value: 4, errorMessage: translate('global.messages.validate.email.minlength')},
                        maxLength: {value: 254, errorMessage: translate('global.messages.validate.email.maxlength')}
                      }}
                      value={props.account.login}
                    />
                  </div>
                </div>
                <div className="update ml-auto mr-auto form-button-center">
                  <Button className="btn-round" color="primary" type="submit">
                    <Translate contentKey="settings.form.button">Save</Translate>
                  </Button>
                </div>
              </AvForm>
            </CardBody>
          </Card>
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Edit Password</CardTitle>
            </CardHeader>
            <CardBody>
              <AvForm id="password-form" onValidSubmit={handleValidPasswordSubmit}>
                <AvField
                  name="currentPassword"
                  label={translate('global.form.currentpassword.label')}
                  placeholder={translate('global.form.currentpassword.placeholder')}
                  type="password"
                  validate={{
                    required: {value: true, errorMessage: translate('global.messages.validate.newpassword.required')}
                  }}
                />
                <AvField
                  name="newPassword"
                  label={translate('global.form.newpassword.label')}
                  placeholder={translate('global.form.newpassword.placeholder')}
                  type="password"
                  validate={{
                    required: {value: true, errorMessage: translate('global.messages.validate.newpassword.required')},
                    minLength: {value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength')},
                    maxLength: {value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength')}
                  }}
                  onChange={updatePassword}
                />
                <PasswordStrengthBar password={password}/>
                <AvField
                  name="confirmPassword"
                  label={translate('global.form.confirmpassword.label')}
                  placeholder={translate('global.form.confirmpassword.placeholder')}
                  type="password"
                  validate={{
                    required: {
                      value: true,
                      errorMessage: translate('global.messages.validate.confirmpassword.required')
                    },
                    minLength: {
                      value: 4,
                      errorMessage: translate('global.messages.validate.confirmpassword.minlength')
                    },
                    maxLength: {
                      value: 50,
                      errorMessage: translate('global.messages.validate.confirmpassword.maxlength')
                    },
                    match: {
                      value: 'newPassword',
                      errorMessage: translate('global.messages.error.dontmatch')
                    }
                  }}
                />
                <div className="update ml-auto mr-auto form-button-center">
                  <Button className="btn-round" color="primary" type="submit">
                    <Translate contentKey="password.form.button">Save</Translate>
                  </Button>
                </div>
              </AvForm>
            </CardBody>
          </Card>
        </Col>
      </Row>
  );
};

const mapStateToProps = ({authentication}: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = {getSession, saveAccountSettings, savePassword, reset};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(User);
