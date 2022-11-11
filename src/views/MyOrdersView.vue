<script lang="ts" setup>
    import { ref, onBeforeMount } from 'vue'
    import { useUserStore } from '../store/user';
import { useBookStore } from '../store/book';

    const userStore = useUserStore();

    onBeforeMount(async () => {
        await userStore.getOrdersOfLoggedUSer();
    })
</script>

<template>

    <div class="flex justify-center flex-col">
        <h1 class="font-bold text-5xl text-center mb-5 mt-10">My Orders</h1>
        <div v-if="userStore.orders.length === 0">
            <p>You didn't make any order yet.</p>
        </div>
        <div v-else class="flex justify-center">
            <div class="orders-container">
                <div v-for="order in userStore.orders" class="order">
                    <div class="order-header">
                      <span><b>Date:</b> {{ order.createdAt.toString().substring(0, 10) }}</span> 
                      <span><b>Status:</b> {{ order.status }} </span>
                      <span><b>Total cost of the order:</b> {{ userStore.getOrderTotalPrice(order).toFixed(2) }} $ </span>
                      <span>{{ order.Books.length }} {{ order.Books.length > 1 ? "articles" : "article" }}</span>
                    </div>
                    <div v-for="book in order.Books" class="order-product">
                        <div class="order-product-image"><img class="order-product-img" :src="'http://localhost:3000/' + book!.img_book"></div>
                        <div class="order-product-name">{{ book.name }}</div>
                        <div class="order-product-price"> {{ book.price }} $ </div>
                        <div class="order-product-amount">{{ book.Order_book.amount }} {{book.Order_book.amount > 1 ? "units" : "unit"}} </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
  .orders-container {
    width: 70%;
  }
  .order {
    border-radius: 10px;
    margin-bottom: 30px;
    padding-bottom: 10px;
    box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
  }
  
  .order-header {
    color: black;
    margin-bottom: 20px;
    font-weight: 300;
    font-size: 18px;
    padding: 20px;
    padding-right: 50px;
    padding-left: 50px;
    background-color: coral;
    border-radius: 10px 10px 0px 0px;
    display: flex;
    justify-content: space-between;
  }
  
  .order-product {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .order-product-img {
    width: 20%;
    border-radius: 10px;
  }
  
  .order-product-image {
    width: 40%;
    display: flex;
    justify-content: center;
  }

  .order-product-name {
    width: 30%;
    display: flex;
    justify-content: center;
  }

  .order-product-price {
    width: 15%;
    display: flex;
    justify-content: center;
  }

  .order-product-amount {
    width: 15%;
    display: flex;
    justify-content: center;
  }
</style>