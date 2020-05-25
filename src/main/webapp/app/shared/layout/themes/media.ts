import { useMediaQuery, useTheme } from '@material-ui/core';

const theme = useTheme();

export const mCol = useMediaQuery(theme.breakpoints.up('xl')) ? 8 : 10;
export const mStatCol = useMediaQuery(theme.breakpoints.up('xl')) ? 3 : 4;
