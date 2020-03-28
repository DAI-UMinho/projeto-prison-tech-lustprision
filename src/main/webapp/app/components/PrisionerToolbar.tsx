import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
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
  searchInput: {
    marginRight: '10px'
  }
}));

const PrisionerToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button>
        <Button
          color="primary"
          variant="contained"
        >
          Add user
        </Button>
      </div>
      <div className={classes.row}>
{/*        <SearchInput
          className={classes.searchInput}
          placeholder="Search user"
        />*/}
      </div>
    </div>
  );
};

PrisionerToolbar.propTypes = {
  className: PropTypes.string
};

export default PrisionerToolbar;
