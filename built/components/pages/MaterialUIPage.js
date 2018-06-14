var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
// import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AlarmIcon from '@material-ui/icons/Alarm';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import red from '@material-ui/core/colors/red';
var styles = function (theme) { return ({
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
}); };
var MaterialUIPage = /** @class */ (function (_super) {
    __extends(MaterialUIPage, _super);
    function MaterialUIPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaterialUIPage.prototype.render = function () {
        var classes = this.props.classes;
        return (React.createElement("div", null,
            React.createElement(IconButton, { className: classes.button, "aria-label": "Delete" },
                React.createElement(DeleteIcon, null)),
            React.createElement(IconButton, { className: classes.button, "aria-label": "Delete", disabled: true, color: "primary" },
                React.createElement(DeleteIcon, null)),
            React.createElement(IconButton, { color: "secondary", className: classes.button, "aria-label": "Add an alarm" },
                React.createElement(AlarmIcon, null)),
            React.createElement(IconButton, { color: "secondary", className: classes.button, "aria-label": "Add an pointer" },
                React.createElement(AlarmIcon, null)),
            React.createElement(IconButton, { color: "primary", className: classes.button, "aria-label": "Add to shopping cart" },
                React.createElement(AddShoppingCartIcon, null)),
            React.createElement("input", { accept: "image/*", className: classes.input, id: "icon-button-file", type: "file" }),
            React.createElement("label", { htmlFor: "icon-button-file" },
                React.createElement(IconButton, { color: "primary", className: classes.button, component: "span" },
                    React.createElement(PhotoCamera, null)))));
    };
    return MaterialUIPage;
}(React.Component));
export default withStyles(styles)(MaterialUIPage);
//# sourceMappingURL=MaterialUIPage.js.map