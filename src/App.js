import "./App.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */
function AddButton(props) {
  return (
    <button
      onClick={() => {
        // Set total
        props.setTotal(props.total + props.pastry.price);
        // Update cart
        if (props.pastry.name in props.cart) {
          props.cart[props.pastry.name] += 1;
        } else {
          props.cart[props.pastry.name] = 1;
        }
        props.setCart(props.cart);
      }}
    >
      Add to Cart
    </button>
  );
}

function BakeryItem(props) {
  return (
    <div
      style={{
        height: "30rem",
        width: "20rem",
        backgroundColor: "lightgray",
        margin: "1rem",
        borderRadius: 20,
      }}
    >
      <div>
        <img
          style={{ maxHeight: "100%", maxWidth: "100%", borderRadius: 20 }}
          src={props.pastry.image}
        ></img>
      </div>
      <div style={{ margin: "1rem" }}>
        <h2>{props.pastry.name}</h2>
        <p>{props.pastry.description}</p>
        <span style={{ marginRight: "10rem" }}>${props.pastry.price}</span>
        <AddButton
          pastry={props.pastry}
          total={props.total}
          setTotal={props.setTotal}
          cart={props.cart}
          setCart={props.setCart}
        ></AddButton>
      </div>
    </div>
  );
}

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState({});

  return (
    <div className="App">
      <div className="app-col">
        <h1>My Bakery</h1> {/* TODO: personalize your bakery (if you want) */}
        <ul>
          {bakeryData.map(
            (
              item,
              index // TODO: map bakeryData to BakeryItem components
            ) => (
              <li key={index}>
                <BakeryItem
                  pastry={item}
                  total={total}
                  setTotal={setTotal}
                  cart={cart}
                  setCart={setCart}
                ></BakeryItem>
              </li>
            )
          )}
        </ul>
      </div>

      <div className="app-col">
        <h2>Cart</h2>
        {/* TODO: render a list of items in the cart */}
        {Object.keys(cart).map((pastry) => (
          <p>
            {cart[pastry]}x {pastry}
          </p>
        ))}
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default App;
