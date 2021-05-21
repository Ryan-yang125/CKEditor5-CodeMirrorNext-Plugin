import { FormControlLabel, Switch } from '@material-ui/core';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const color = '#3370ff';
const theme = createMuiTheme({
    palette: {
        primary: {
            main: color,
        },
    },
});
export default ({ onLineWrappingChange }) => {
    const handleChange = evt => {
        onLineWrappingChange(evt.target.checked);
    };
    return (
        <ThemeProvider theme={theme}>
            <FormControlLabel control={<Switch color="primary" onChange={handleChange} />} label="自动换行" />
        </ThemeProvider>
    );
};
