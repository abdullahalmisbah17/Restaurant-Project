
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