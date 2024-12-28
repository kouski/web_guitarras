import { useState,useEffect } from 'react';
import db from './data/db';
import Header from './components/Header';
import Guitar from './components/Guitar';



function App() {

const initialCart = ()=> {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart? JSON.parse(localStorageCart): [];
}
  
const [data, setData] = useState(db);
const [cart, setCart] = useState(initialCart);

const max_items = 5;
const min_items = 1;

useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
}, [cart])


function addtoCart(item){

    const itemExist = cart.findIndex((guitar)=>guitar.id===item.id);
    if(itemExist >= 0){
        if(cart[itemExist].quantity >= max_items) return
        const updatedCart = [...cart];
        updatedCart[itemExist].quantity++;
        setCart(updatedCart);
    }else{
        item.quantity = 1;
        setCart([...cart, item]);
        console.log('Agregando artículo al carrito');
    }
    
}

function deleteItem(id){
    const updatedCart = cart.filter((guitar)=>guitar.id !== id);
    setCart(updatedCart)};


    function increaseQuantity(id){
        const increase = cart.map(item=>{
            if(item.id === id && item.quantity < max_items){
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(increase)
    }

function decreaseQuantity(id){
    const decrease = cart.map(item=>{
        if(item.id === id && item.quantity > min_items){
            return {
                ...item,
                quantity: item.quantity - 1
            }
        }
        return item
    })
    setCart(decrease)
}

function clearCart(){
    setCart([]);
}






  return (
    <>
    
    <Header 
        cart={cart}
        deleteItem={deleteItem}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        
    
    />
  

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar)=>{
                return <Guitar
                key={guitar.id}
                guitar={guitar}
                cart={cart}
                setCart={setCart}
                addtoCart={addtoCart}
                />
            })}
            

        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
      
    </>
  )
}

export default App
