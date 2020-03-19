import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/prisioner">
      <Translate contentKey="global.menu.entities.prisioner" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/question">
      <Translate contentKey="global.menu.entities.question" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/question-quiz">
      <Translate contentKey="global.menu.entities.questionQuiz" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/permission">
      <Translate contentKey="global.menu.entities.permission" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/login">
      <Translate contentKey="global.menu.entities.login" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/purchase">
      <Translate contentKey="global.menu.entities.purchase" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/press-work">
      <Translate contentKey="global.menu.entities.pressWork" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pris-quiz">
      <Translate contentKey="global.menu.entities.prisQuiz" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/system-admin">
      <Translate contentKey="global.menu.entities.systemAdmin" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/admin-employ">
      <Translate contentKey="global.menu.entities.adminEmploy" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/press-product">
      <Translate contentKey="global.menu.entities.pressProduct" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/product">
      <Translate contentKey="global.menu.entities.product" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/work">
      <Translate contentKey="global.menu.entities.work" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/quiz">
      <Translate contentKey="global.menu.entities.quiz" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
