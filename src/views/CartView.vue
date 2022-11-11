<script lang="ts" setup>
    import router  from '../router/index';
    import { useBookStore } from '../store/book';
    import { ref, onBeforeMount } from 'vue';

    const bookStore = useBookStore();

    const buy = () => {
        bookStore.makeOrder()
        router.push("/books")
    }

</script>

<template>
    <div class="flex justify-center">
        <div class="cart-container">
            <h1 class="font-bold text-5xl text-center mb-5 mt-10">Your cart</h1>
            <div v-if="bookStore.cart.length === 0">
                <p>No products in your cart. Add some!</p>
            </div>
            <div v-else class="cart-view">
                <div v-for="item in bookStore.cart">
                    <div class="cart-product">
                        <div class="cart-product-remove">
                            <button @click="bookStore.deleteProductCart(item.book.id)" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                <img class="cart-remove-img" src="../assets/remove-icon.png">
                            </button>
                        </div>
                        <div class="cart-product-image"><img class="cart-product-img" :src="'http://localhost:3000/' + item.book!.img_book"></div>
                        <div class="cart-product-name">{{ item.book.name }} </div>
                        <div class="cart-product-amount">{{ item.amount }} {{item.amount > 1 ? "units" : "unit"}}</div>
                        <div class="cart-product-price">{{ item.book.price }} $</div>
                    </div>
                </div>
                <div class="total-price"><span class="total-price-label">Total price:</span> <span class="total-price-value">{{ bookStore.getCartTotalPrice().toFixed(2) }} $</span></div> 
                <div class="cart-buy">
                    <button @click="buy()" class="buy text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Buy
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
    .cart-product {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
    }
    
    .cart-product-img {
        width: 70%;
        border-radius: 10px;
    }
    
    .cart-remove-img {
        width: 20px;
    }
    
    .cart-product-remove {
        width: 15%;
        display: flex;
        justify-content: center;
    }
    
    .cart-product-image {
        width: 10%;
        display: flex;
        justify-content: center;
    }
    .cart-product-name {
        width: 25%;
        display: flex;
        justify-content: center;
    }
    .cart-product-price {
        width: 15%;
        display: flex;
        justify-content: center;
    }
    .cart-product-amount {
        width: 15%;
        display: flex;
        justify-content: center;
    }
    
    .buy {
        width: 15%;
        font-size: 20px;
        font-weight: bold;
        margin: 15px 0;
    }
    
    .cart-buy {
        display: flex;
        justify-content: center;
    }

    .cart-img {
        width: 25px;
    }
      
    .cart-container {
        align-self: center;
        width: 70%;
    }
      
    .total-price {
        padding: 20px 0;
        border-top: 1px dotted #0f11116e;
        display: flex;
        justify-content: flex-end;
    }
    
    .total-price-label {
        font-weight: bold;
        width: 25%;
        display: flex;
        justify-content: center;
    }
    
    .total-price-value {
        display: flex;
        justify-content: center;
        width: 15%;
    }
</style>