const React = require("react");
const { makeStyles } = require("@material-ui/core");
const { Button } = require("@material-ui/core/");


const useStyles = makeStyles(theme => ({
  button: {},
  input: {}
}));

module.exports = ({ onClick, buttonText }) => {
  const classes = useStyles();
  return (
    <Button variant="outlined" className={classes.button} onClick={onClick}>
      {buttonText || "SHOW MORE"}
    </Button>
  );
};
