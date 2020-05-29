import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.up('lg')]: {
        width: '240px',
      },
      [theme.breakpoints.up('xl')]: {
        width: '340px',
      },
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

interface ProductSearchState{
  onSearchChange: any;
  searchValue: string;
}

const SearchBar = (props: ProductSearchState) => {
  const classes = useStyles();
  const { onSearchChange, searchValue } = props;

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        onChange={onSearchChange}
        placeholder="Search ..."
        inputProps={{ 'aria-label': 'search google maps' }}
        value={searchValue}
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;
