// import api from "../../../lib/api";
// import type { IProduct } from "../product/product.type";
// import type { ICart, ICartStore } from "./cart.type";

// let cart_section = document.getElementById('cart_section');
// let cart_togglers = document.querySelectorAll(".cart-toggler");
// let product_grid = document.getElementById('product_grid');
// let cart_container = document.getElementById('cart_container');


// cart_togglers.forEach(element => {
//     element?.addEventListener("click", () => {
//         cart_section?.classList.toggle('hidden')
//     })
// })

// // Add item to cart;
// if (product_grid) {

//     product_grid.addEventListener("click", async (event) => {
//         let addToCartBtn = ((event.target) as HTMLElement).classList.contains('add-to-cart');

//         if (addToCartBtn) {

//             let dataId = ((event.target) as HTMLElement).dataset.id;

//             let res = await api.get(`/product/${dataId}`);

//             if (res.status == 200) {

//                 let myCartProduct = res.data;

//                 addCartToLocalStorage(myCartProduct)

//                 renderCartItems();


//             }



//         }

//     })
// }


// if (cart_container) {

//     cart_container.addEventListener('click', (event) => {
//         let deleteBtn = ((event.target) as HTMLElement).classList.contains('delete-btn');
//         let incrementBtn = ((event.target) as HTMLElement).classList.contains('increment-btn');
//         let decrementBtn = ((event.target) as HTMLElement).classList.contains('decrement-btn');

//         // Delete item from cart;
//         if (deleteBtn) {
//             let dataId = ((event.target) as HTMLElement).dataset.id;


//             let oldCartData = JSON.parse(localStorage.getItem('cart') as string).data


//             let updateCartDataWithOldProductItem = oldCartData.filter((item: ICart) => item.id != dataId);

//             let grandTotalPriceCalculation = updateCartDataWithOldProductItem.reduce((total: number, current: ICart) => {
//                 return total + Number(current.totalPrice);
//             }, 0);


//             let updateCartData: ICartStore = {
//                 data: updateCartDataWithOldProductItem,
//                 totalPrice: grandTotalPriceCalculation
//             }

//             localStorage.setItem('cart', JSON.stringify(updateCartData))

//             renderCartItems()
//         }

//         // Increment quantity;
//         if (incrementBtn) {
//             let dataId = ((event.target) as HTMLElement).dataset.id;
//             console.log(dataId);


//             let oldCartData = JSON.parse(localStorage.getItem('cart') as string).data


//             let updateCartDataWithOldProductItem = oldCartData.map((item: ICart) => {
//                 if (item.id == dataId) {
//                     return {
//                         ...item,
//                         quantity: Number(item.quantity) + 1,
//                         totalPrice: Number(item.price) * (Number(item.quantity) + 1)
//                     }
//                 }

//                 return item;
//             })

//             let grandTotalPriceCalculation = updateCartDataWithOldProductItem.reduce((total: number, current: ICart) => {
//                 return total + Number(current.totalPrice);
//             }, 0);


//             let updateCartData: ICartStore = {
//                 data: updateCartDataWithOldProductItem,
//                 totalPrice: grandTotalPriceCalculation
//             }

//             localStorage.setItem('cart', JSON.stringify(updateCartData))

//             renderCartItems()
//         }


//         if (decrementBtn) {
//             let dataId = ((event.target) as HTMLElement).dataset.id;
//             console.log(dataId);


//             let oldCartData = JSON.parse(localStorage.getItem('cart') as string).data


//             let updateCartDataWithOldProductItem = oldCartData.map((item: ICart) => {
//                 if (item.id == dataId) {
//                     return {
//                         ...item,
//                         quantity: item.quantity == 1 ? 1 : Number(item.quantity) - 1,
//                         totalPrice: Number(item.price) * (item.quantity == 1 ? 1 : Number(item.quantity) - 1)
//                     }
//                 }

//                 return item;
//             })

//             let grandTotalPriceCalculation = updateCartDataWithOldProductItem.reduce((total: number, current: ICart) => {
//                 return total + Number(current.totalPrice);
//             }, 0);


//             let updateCartData: ICartStore = {
//                 data: updateCartDataWithOldProductItem,
//                 totalPrice: grandTotalPriceCalculation
//             }

//             localStorage.setItem('cart', JSON.stringify(updateCartData))

//             renderCartItems()
//         }


//     })



// }




// // =================== Helper function =======================

// function addCartToLocalStorage(product: IProduct) {
//     let checkLocalStorage = localStorage.getItem('cart');

//     // Add new cart;
//     if (!checkLocalStorage) {
//         let newCartData: ICartStore = {
//             data: [
//                 {
//                     id: product.id as string,
//                     name: product.name,
//                     image: product.image,
//                     price: product.price,
//                     quantity: 1,
//                     totalPrice: product.price
//                 }
//             ],
//             totalPrice: product.price
//         }
//         localStorage.setItem('cart', JSON.stringify(newCartData))
//     }

//     // Update cart;

//     else {
//         let oldCartFromLocalStorage = localStorage.getItem('cart');

//         let oldCartData = JSON.parse(oldCartFromLocalStorage as string).data

//         let ifExist = oldCartData.find((item: ICart) => item.id == product.id);

//         if (ifExist) return;

//         let updateCartDataWithOldProductItem = [
//             ...oldCartData,
//             {
//                 id: product.id as string,
//                 name: product.name,
//                 image: product.image,
//                 price: product.price,
//                 quantity: 1,
//                 totalPrice: product.price
//             }
//         ]

//         let grandTotalPriceCalculation = updateCartDataWithOldProductItem.reduce((total, current) => {
//             return total + Number(current.totalPrice);
//         }, 0);


//         let updateCartData: ICartStore = {
//             data: updateCartDataWithOldProductItem,
//             totalPrice: grandTotalPriceCalculation
//         }

//         localStorage.setItem('cart', JSON.stringify(updateCartData))

//     }




// }

// function renderCartItems() {

//     let sub_total = document.getElementById('sub_total');
//     let cart_total_count = document.getElementById('cart_total_count');

//     let cartHTML = "";

//     let getCartDataFromLocalStorage = localStorage.getItem('cart');

//     if (!getCartDataFromLocalStorage) return;

//     let getDataItems = JSON.parse(getCartDataFromLocalStorage as string).data;

//     getDataItems.forEach((item: ICart) => {
//         cartHTML += `<div class="flex items-center gap-4 p-5">

         
//           <img src="/src/assets/images/food/${item.image}" alt="Product" class="h-20 w-20 shrink-0 rounded-lg object-cover" />

//           <!-- Product Info -->
//           <div class="min-w-0 flex-1">
//             <h3 class="truncate font-medium text-gray-900">
//               Premium Cotton T-Shirt
//             </h3>

//             <p class="mt-1 text-sm text-gray-500">
//               $${Number(item.price).toFixed(2)} each
//             </p>
//           </div>

//           <!-- Quantity -->
//           <div class="flex items-center rounded-lg border border-gray-200">
//             <button type="button"
//             data-id="${item.id}"
//               class="flex h-9 w-9 decrement-btn items-center justify-center text-lg text-gray-600 transition hover:bg-gray-100">
//               −
//             </button>

//             <span class="w-10 text-center text-sm font-medium text-gray-900">
//               ${item.quantity}
//             </span>

//             <button type="button"
//             data-id="${item.id}"
//               class="flex h-9 w-9 increment-btn items-center justify-center text-lg text-gray-600 transition hover:bg-gray-100">
//               +
//             </button>
//           </div>

//           <!-- Price -->
//           <div class="w-24 text-right">
//             <p class="text-xs text-gray-500">Price</p>
//             <p class="mt-1 font-medium text-gray-700">$${Number(item.price).toFixed(2)}</p>
//           </div>

//           <!-- Total -->
//           <div class="w-24 text-right">
//             <p class="text-xs text-gray-500">Total</p>
//             <p class="mt-1 font-semibold text-gray-900">$${Number(item.totalPrice).toFixed(2)}</p>
//           </div>

//           <!-- Action -->
//           <div class="w-24 text-right">
//             <button class="text-red-500 delete-btn cursor-pointer" data-id="${item.id}">Delete</button>
//           </div>

//         </div>`
//     })

//     if (cart_container) cart_container.innerHTML = cartHTML;
//     if (sub_total) sub_total.innerHTML = JSON.parse(getCartDataFromLocalStorage as string).totalPrice;
//     if (cart_total_count) cart_total_count.innerHTML = getDataItems.length


// }

// renderCartItems();




import api from "../../../lib/api";
import type { IProduct } from "../product/product.type";
import type { ICart, ICartStore } from "./cart.type";


// =====================================================
// DOM Elements
// =====================================================

const cartSection =
    document.getElementById("cart_section");

const cartTogglers =
    document.querySelectorAll(".cart-toggler");

const cartContainer =
    document.getElementById("cart_container");


// =====================================================
// Cart Toggle
// =====================================================

cartTogglers.forEach((element) => {

    element.addEventListener("click", () => {

        cartSection?.classList.toggle("hidden");

    });

});


// =====================================================
// Add To Cart
// =====================================================

document.addEventListener("click", async (event) => {

    const target = event.target;

    if (!(target instanceof Element)) return;


    const addToCartBtn =
        target.closest(".add-to-cart");


    if (!(addToCartBtn instanceof HTMLElement)) {
        return;
    }


    const productId =
        addToCartBtn.dataset.id;


    if (!productId) {

        console.log("Product ID not found!");

        return;

    }


    try {

        console.log("Adding product:", productId);


        const response =
            await api.get(`/product/${productId}`);


        if (response.status === 200) {

            const product: IProduct =
                response.data;


            addCartToLocalStorage(product);


            renderCartItems();

        }

    } catch (error) {

        console.error(
            "Failed to add product:",
            error
        );

    }

});


// =====================================================
// Cart Actions
// =====================================================

cartContainer?.addEventListener("click", (event) => {

    const target = event.target;

    if (!(target instanceof Element)) return;


    // =================================================
    // Delete
    // =================================================

    const deleteBtn =
        target.closest(".delete-btn");


    if (deleteBtn instanceof HTMLElement) {

        const id =
            deleteBtn.dataset.id;


        if (!id) return;


        const cartStorage =
            localStorage.getItem("cart");


        if (!cartStorage) return;


        const cartStore: ICartStore =
            JSON.parse(cartStorage);


        const updatedData =
            cartStore.data.filter(
                (item) => item.id != id
            );


        saveCart(updatedData);

        return;

    }


    // =================================================
    // Increment
    // =================================================

    const incrementBtn =
        target.closest(".increment-btn");


    if (incrementBtn instanceof HTMLElement) {

        const id =
            incrementBtn.dataset.id;


        if (!id) return;


        const cartStorage =
            localStorage.getItem("cart");


        if (!cartStorage) return;


        const cartStore: ICartStore =
            JSON.parse(cartStorage);


        const updatedData =
            cartStore.data.map((item) => {

                if (item.id == id) {

                    const quantity =
                        Number(item.quantity) + 1;


                    return {

                        ...item,

                        quantity,

                        totalPrice:
                            Number(item.price) *
                            quantity

                    };

                }


                return item;

            });


        saveCart(updatedData);

        return;

    }


    // =================================================
    // Decrement
    // =================================================

    const decrementBtn =
        target.closest(".decrement-btn");


    if (decrementBtn instanceof HTMLElement) {

        const id =
            decrementBtn.dataset.id;


        if (!id) return;


        const cartStorage =
            localStorage.getItem("cart");


        if (!cartStorage) return;


        const cartStore: ICartStore =
            JSON.parse(cartStorage);


        const updatedData =
            cartStore.data.map((item) => {

                if (item.id == id) {

                    const currentQuantity =
                        Number(item.quantity);


                    const quantity =
                        currentQuantity > 1
                            ? currentQuantity - 1
                            : 1;


                    return {

                        ...item,

                        quantity,

                        totalPrice:
                            Number(item.price) *
                            quantity

                    };

                }


                return item;

            });


        saveCart(updatedData);

    }

});


// =====================================================
// Add Product To LocalStorage
// =====================================================

function addCartToLocalStorage(
    product: IProduct
) {

    const cartStorage =
        localStorage.getItem("cart");


    // =================================================
    // New Cart
    // =================================================

    if (!cartStorage) {

        const newCart: ICartStore = {

            data: [

                {

                    id: String(product.id),

                    name: product.name,

                    image: product.image,

                    price: Number(product.price),

                    quantity: 1,

                    totalPrice:
                        Number(product.price)

                }

            ],

            totalPrice:
                Number(product.price)

        };


        localStorage.setItem(
            "cart",
            JSON.stringify(newCart)
        );


        return;

    }


    // =================================================
    // Existing Cart
    // =================================================

    const cartStore: ICartStore =
        JSON.parse(cartStorage);


    // Check duplicate

    const alreadyExists =
        cartStore.data.some(
            (item) =>
                item.id == String(product.id)
        );


    if (alreadyExists) {

        console.log(
            "Product already exists in cart"
        );

        return;

    }


    // Add new product

    const updatedData: ICart[] = [

        ...cartStore.data,

        {

            id: String(product.id),

            name: product.name,

            image: product.image,

            price: Number(product.price),

            quantity: 1,

            totalPrice:
                Number(product.price)

        }

    ];


    saveCart(updatedData);

}


// =====================================================
// Save Cart
// =====================================================

function saveCart(
    data: ICart[]
) {

    const totalPrice =
        data.reduce(
            (total, item) => {

                return total +
                    Number(item.totalPrice);

            },
            0
        );


    const cartStore: ICartStore = {

        data,

        totalPrice

    };


    localStorage.setItem(
        "cart",
        JSON.stringify(cartStore)
    );


    renderCartItems();

}


// =====================================================
// Render Cart
// =====================================================

function renderCartItems() {

    const subTotal =
        document.getElementById("sub_total");

    const cartTotalCount =
        document.getElementById(
            "cart_total_count"
        );


    const cartStorage =
        localStorage.getItem("cart");


    // =================================================
    // Empty Cart
    // =================================================

    if (!cartStorage) {

        if (cartContainer) {

            cartContainer.innerHTML = `
                <div class="flex h-full items-center justify-center">
                    <p class="text-gray-500">
                        Your cart is empty.
                    </p>
                </div>
            `;

        }


        if (subTotal) {

            subTotal.innerHTML =
                "$0.00";

        }


        if (cartTotalCount) {

            cartTotalCount.innerHTML =
                "0";

        }


        return;

    }


    const cartStore: ICartStore =
        JSON.parse(cartStorage);


    let cartHTML = "";


    // =================================================
    // Generate Cart HTML
    // =================================================

    cartStore.data.forEach((item) => {

        cartHTML += `

            <div
                class="flex items-center gap-4 p-5"
            >

                <!-- Image -->

                <img
                    src="/src/assets/images/food/${item.image}"
                    alt="${item.name}"
                    class="h-20 w-20 shrink-0 rounded-lg object-cover"
                />


                <!-- Product Info -->

                <div class="min-w-0 flex-1">

                    <h3
                        class="truncate font-medium text-gray-900"
                    >
                        ${item.name}
                    </h3>

                    <p
                        class="mt-1 text-sm text-gray-500"
                    >
                        $${Number(item.price).toFixed(2)}
                        each
                    </p>

                </div>


                <!-- Quantity -->

                <div
                    class="flex items-center rounded-lg border border-gray-200"
                >

                    <button
                        type="button"
                        data-id="${item.id}"
                        class="decrement-btn flex h-9 w-9 cursor-pointer items-center justify-center text-lg text-gray-600 hover:bg-gray-100"
                    >
                        −
                    </button>


                    <span
                        class="w-10 text-center text-sm font-medium"
                    >
                        ${item.quantity}
                    </span>


                    <button
                        type="button"
                        data-id="${item.id}"
                        class="increment-btn flex h-9 w-9 cursor-pointer items-center justify-center text-lg text-gray-600 hover:bg-gray-100"
                    >
                        +
                    </button>

                </div>


                <!-- Price -->

                <div class="w-24 text-right">

                    <p
                        class="text-xs text-gray-500"
                    >
                        Price
                    </p>

                    <p
                        class="mt-1 font-medium text-gray-700"
                    >
                        $${Number(item.price).toFixed(2)}
                    </p>

                </div>


                <!-- Total -->

                <div class="w-24 text-right">

                    <p
                        class="text-xs text-gray-500"
                    >
                        Total
                    </p>

                    <p
                        class="mt-1 font-semibold text-gray-900"
                    >
                        $${Number(item.totalPrice).toFixed(2)}
                    </p>

                </div>


                <!-- Delete -->

                <div class="w-20 text-right">

                    <button
                        type="button"
                        data-id="${item.id}"
                        class="delete-btn cursor-pointer text-red-500"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `;

    });


    // =================================================
    // Insert
    // =================================================

    if (cartContainer) {

        cartContainer.innerHTML =
            cartHTML;

    }


    // =================================================
    // Subtotal
    // =================================================

    if (subTotal) {

        subTotal.innerHTML =
            `$${Number(
                cartStore.totalPrice
            ).toFixed(2)}`;

    }


    // =================================================
    // Count
    // =================================================

    if (cartTotalCount) {

        cartTotalCount.innerHTML =
            String(cartStore.data.length);

    }

}


// =====================================================
// Initial Render
// =====================================================

renderCartItems();