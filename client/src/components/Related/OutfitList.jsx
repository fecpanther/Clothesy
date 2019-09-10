const React = require("react");
const CardItem = require("./Card.jsx");
const { GridList } = require("@material-ui/core");
const { makeStyles } = require("@material-ui/core");
const { GridListTile } = require("@material-ui/core");
const AddToOutfitCard = require("./AddToOutfitCard");
const { useState, useEffect } = require("react");

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  gridList: {
    flexWrap: "nowrap"
    // transform: "translateZ(0)"
    // // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
  },
  gridListItem: {
    width: "100px",
    margin: "0px"
  }
});

module.exports = function OutfitList(props) {
  const classes = useStyles();
  let products;
  window.localStorage.getItem("outfit")
    ? (products = JSON.parse(window.localStorage.getItem("outfit")))
    : (products = []);

  const [outfitIds, setOutfitIds] = useState({
    outfitList: products
  });

  const addToOutfit = product => {
    if (window.localStorage.getItem("outfit") === null) {
      window.localStorage.setItem("outfit", JSON.stringify([product]));
    } else {
      let items = JSON.parse(window.localStorage.getItem("outfit"));
      if (items.indexOf(product) < 0) items.push(product);
      window.localStorage.setItem("outfit", JSON.stringify(items));
    }
    setOutfitIds({
      outfitList: JSON.parse(window.localStorage.getItem("outfit"))
    });
  };

  const removeFromOutfit = product => {
    let items = JSON.parse(window.localStorage.getItem("outfit"));
    items = items.filter(item => {
      return item !== product;
    });
    window.localStorage.setItem("outfit", JSON.stringify(items));
    setOutfitIds({
      outfitList: JSON.parse(window.localStorage.getItem("outfit"))
    });
  };

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList}>
        <AddToOutfitCard addToOutfit={addToOutfit} product={props.productId} />
        {products.map(product => {
          return (
            <CardItem
              id={product}
              key={product}
              showStarIcon={false}
              changeCurrentProduct={props.changeCurrentProduct}
              onRemoveClick={() => {
                removeFromOutfit(product);
              }}
            />
          );
        })}
      </GridList>
    </div>
  );
};
