import React, { useState, useEffect } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {

  const [pizzas, setPizzas] = useState([])
  const [editPizza, setEditPizza] = useState({})

  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
    .then(r => r.json())
    .then(data => setPizzas(data))
  }, [])

  function handleEditPopulate(pizza) {
    setEditPizza(pizza)
  }

  function handleChangePizza(name, value) {
    setEditPizza({...editPizza, [name]: name==="vegetarian" ? value==="Vegetarian" : value })
  }

  function handleSubmitPizza() {
    fetch(`http://localhost:3001/pizzas/${editPizza.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editPizza)
    })
    .then(r => r.json())
    .then(data => {
      const newPizzaData = [...pizzas];
      const found = newPizzaData.find(p => p.id===data.id);
      const index = newPizzaData.indexOf(found);
      newPizzaData[index] = data;
      setPizzas(newPizzaData);
      setEditPizza({id: 0, topping: "", size: "Small", vegetarian: undefined});
    })
  }

  return (
    <>
      <Header />
      <PizzaForm editPizza={editPizza} onChange={handleChangePizza} onSubmit={handleSubmitPizza} />
      <PizzaList pizzas={pizzas} onEditPizza={handleEditPopulate} />
    </>
  );
}

export default App;
