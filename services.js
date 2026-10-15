// ===============================
// FILTER SERVICES
// ===============================
function filterServices(category) {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");

        if (category === "all" || cardCategory === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}


// ===============================
// PAYMENT FUNCTION (RAZORPAY)
// ===============================
function book(price, serviceName) {

    // Basic validation
    if (!price || !serviceName) {
        alert("Something went wrong. Please try again.");
        return;
    }

    // Razorpay options
    const options = {
        key: "rzp_test_123456789", // 🔴 Replace with your real key
        amount: price * 100, // Convert ₹ to paisa
        currency: "INR",
        name: "Radharani Salon",
        description: serviceName,

        // Payment success handler
        handler: function (response) {
            console.log("Payment Success:", response);

            alert(
                "✅ Payment Successful!\n\n" +
                "Service: " + serviceName + "\n" +
                "Amount: ₹" + price + "\n" +
                "Payment ID: " + response.razorpay_payment_id
            );

            // Redirect after success
            window.location.href = "ContactUs.html";
        },

        // Prefill customer info (can be dynamic later)
        prefill: {
            name: "Customer Name",
            email: "customer@email.com",
            contact: "9999999999"
        },

        // Theme color
        theme: {
            color: "#ff5fa2"
        },

        // Modal behavior
        modal: {
            ondismiss: function () {
                console.log("Payment popup closed");
                alert("⚠️ Payment Cancelled");
            }
        }
    };

    // Create Razorpay instance
    const rzp = new Razorpay(options);

    // Open payment popup
    rzp.open();

    // Handle payment failure
    rzp.on('payment.failed', function (response) {
        console.error("Payment Failed:", response);

        alert(
            "❌ Payment Failed\n\n" +
            "Reason: " + response.error.description
        );
    });
}