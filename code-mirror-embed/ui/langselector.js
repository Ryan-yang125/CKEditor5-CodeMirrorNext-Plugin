import React, { useState } from 'react';
import { Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { languageSupport } from '../lang';
const useStyles = makeStyles(theme => ({
    selectorContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    formControl: {
        marginLeft: theme.spacing(2),
        marginTop: '5px',
    },
}));

const theme = createMuiTheme({
    overrides: {
        MuiSelect: {
            root: {
                fontSize: '16px',
            },
            icon: {
                marginTop: '-5px',
            },
        },
    },
});
export default ({ language, onLangChange }) => {
    const classes = useStyles();

    // get initial language index in languageSupport
    // if none, default set plain text
    let initialLangLabel = language;
    let initialLangLabelIndex = 0;
    languageSupport.forEach((item, index) => {
        if (item.label === initialLangLabel) {
            initialLangLabelIndex = index;
        }
    });
    const [langLabelIndex, setLangLabelIndex] = useState(initialLangLabelIndex);

    const menuItem = languageSupport.map((item, index) => (
        <MenuItem value={index} key={`${item.language}-${index}`}>
            {item.label}
        </MenuItem>
    ));

    const handleChange = evt => {
        const value = evt.target.value;
        setLangLabelIndex(value);
        onLangChange(languageSupport[value].language);
    };
    return (
        <div className={classes.selectorContainer}>
            <ThemeProvider theme={theme}>
                <FormControl className={classes.formControl}>
                    <Select value={langLabelIndex} onChange={handleChange} variant="standard" disableUnderline>
                        {menuItem}
                    </Select>
                </FormControl>
            </ThemeProvider>
        </div>
    );
};
