const React = require("react");
const CardItem = require("./Card.jsx");
const { GridList } = require("@material-ui/core");
const { makeStyles } = require("@material-ui/core");
const { GridListTile } = require("@material-ui/core");
const { Modal } = require("@material-ui/core");
const { Backdrop, Fade } = require("@material-ui/core");
const { useState, useEffect } = require("react");
const {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody
} = require("@material-ui/core");

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)"
    // // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
  },
  gridListItem: {
    width: "100px",
    margin: "0px"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  modal: {
    position: "absolute",
    top: "10%",
    left: "10%",
    overflow: "scroll",
    height: "100%",
    display: "block"
  }
}));

module.exports = function RelatedCardList(props) {
  if (!props.related) {
    return <div></div>;
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [modalRows, setModalRows] = React.useState([
    { current: "", feature: "", selected: "" }
  ]);

  let starClickRows = [{ current: "0", feature: "1", selected: "2" }];

  const onStarClick = selectedItem => {
    let currentName = props.indexProps.currentProduct.name;
    let currentFeatures = props.indexProps.currentProduct.features;
    let currentFeaturesObj = {};
    let selectedName = selectedItem.productName;
    let selectedFeatures = selectedItem.features;
    let selectedFeaturesObj = {};
    starClickRows = [
      {
        current: currentName,
        feature: "Feature",
        selected: selectedName
      }
    ];

    currentFeatures.map(elt => {
      currentFeaturesObj[elt.feature] = elt.value;
      if (elt.value === true) currentFeaturesObj[elt.feature] = "✓";
    });
    selectedFeatures.map(elt => {
      selectedFeaturesObj[elt.feature] = elt.value;
      if (elt.value === true) selectedFeaturesObj[elt.feature] = "✓";
    });
    for (let feature in currentFeaturesObj) {
      starClickRows.push({
        current: currentFeaturesObj[feature] || "",
        feature: feature,
        selected: selectedFeaturesObj[feature] || ""
      });
      delete selectedFeaturesObj[feature];
    }
    for (let feature in selectedFeaturesObj) {
      starClickRows.push({
        current: currentFeaturesObj[feature] || "",
        feature: feature,
        selected: selectedFeaturesObj[feature] || ""
      });
    }
    handleOpen();
    setModalRows(starClickRows);
  };

  const classes = useStyles();
  const items = props.related.map(item => {
    return (
      <CardItem
        id={item}
        key={item}
        onStarClick={onStarClick}
        setModalRows={setModalRows}
        changeCurrentProduct={props.changeCurrentProduct}
        showStarIcon={true}
      />
    );
  });
  return (
    <div>
      <Modal
        aria-labelledby="comparing"
        aria-describedby="compares-selected-with-current-item"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
        className={classes.modal}
      >
        <Fade in={open} className={classes.paper}>
          <div>
            <Table className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{modalRows[0].current}</TableCell>
                  <TableCell align="center">{modalRows[0].feature}</TableCell>
                  <TableCell align="right">{modalRows[0].selected}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {modalRows.map((row, idx) => {
                  if (idx === 0) return;
                  return (
                    <TableRow key={row.feature}>
                      <TableCell align="left">{row.current}</TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.feature}
                      </TableCell>
                      <TableCell align="right">{row.selected}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Fade>
      </Modal>
      <div className={classes.root}>
        <GridList className={classes.gridList}>{items}</GridList>
      </div>
    </div>
  );
};
