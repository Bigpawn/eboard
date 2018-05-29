import * as React from 'react';
// import * as PropTypes from 'prop-types';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AlarmIcon from '@material-ui/icons/Alarm';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import red from '@material-ui/core/colors/red';

const styles = (theme: any) => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    iconHover: {
        "margin": theme.spacing.unit,
        '&:hover': {
            color: red[800],
        },
    },
});

class MaterialUIPage extends React.Component <WithStyles<'button'|'input'|'iconHover'>, {} > {

    public render() {
        const {classes}: any = this.props;
        return (
            <div>
                <IconButton className={classes.button} aria-label="Delete">
                    <DeleteIcon/>
                </IconButton>
                <IconButton
                    className={classes.button}
                    aria-label="Delete"
                    disabled
                    color="primary">
                    <DeleteIcon/>
                </IconButton>
                <IconButton
                    color="secondary"
                    className={classes.button}
                    aria-label="Add an alarm">
                    {/* <Icon>alarm</Icon> */}
                    <AlarmIcon/>
                </IconButton>
                <IconButton
                    color="secondary"
                    className={classes.button}
                    aria-label="Add an pointer">
                    <AlarmIcon/>
                </IconButton>
                <IconButton
                    color="primary"
                    className={classes.button}
                    aria-label="Add to shopping cart">
                    <AddShoppingCartIcon/>
                </IconButton>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"/>
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" className={classes.button} component="span">
                        <PhotoCamera/>
                    </IconButton>
                </label>
            </div>
        );
    }
}

export default withStyles(styles)(MaterialUIPage);
