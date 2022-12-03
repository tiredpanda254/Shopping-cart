import Header from './Components/Header';
import Main from './Components/Main';
import Basket from './Components/Basket';
import data from './data';
import Filters from './Components/Filters';
import React,{useState} from 'react';
import Product from './Components/Product';
function App() {
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);
  const [filters, setFilters] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePrice, setActivePrice] = useState('');

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
   if (exist) {
     setCartItems(
       cartItems.map((x) =>
         x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
       )
     );
   } else {
     setCartItems([...cartItems, { ...product, qty: 1 }]);
   }
 };


  
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  return (
    <div className="App">
      <Header countCartItems={cartItems.length}></Header>
      <div className="row">
        <Main products={products} onAdd={onAdd}></Main>
        <div className="container md:mx-auto mx-1  my-4">
        <Filters
          products={products}
          setFilters={setFilters}
          setActivePrice={setActivePrice}
          activePrice={activePrice}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
      <div className="flex flex-wrap my-4 container md:mx-auto mx-1">
        {filters.map((product) => (
          <Product
            onAdd={onAdd}
            key={product.id}
            product={product}
          />
        ))}
      </div>
     
     <Basket
       cartItems={cartItems}
       onAdd={onAdd}
       onRemove={onRemove}
     ></Basket>
   </div>
    </div>
  );
}

export default App;