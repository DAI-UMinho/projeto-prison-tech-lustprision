import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const datePicker = makeStyles((theme: Theme) =>
  createStyles({
    datePicker: {
      border: '1px solid #ced4da',
      borderRadius: '0.25rem'
    }
  })
);
