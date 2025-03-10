console.log("ok");

async function loadPayments() {
  try {
    let response = await fetch("../databases/payments.json");
    let payments = await response.json();
    const paymentdetails = document.querySelector(".paymentdetails");

    // Limpiar el contenedor antes de agregar los nuevos elementos
    paymentdetails.innerHTML = "";

    if (payments.length > 0) {
      payments.forEach((pay) => {
        let paymentDiv = document.createElement("div");
        paymentDiv.innerHTML = `
          <p>${pay.name}</p>
          <p>${pay.paymentschedule}</p>
          <p>${pay.billNumber}</p>
          <p>${pay.amountpaid}</p>
          <p>${pay.balanceamount}</p>
          <p>${pay.date}</p>
          <img src="../storage/img/eyeIconPayment.svg" alt="Payment Icon">
        `;
        // Se añade cada div al contenedor principal
        paymentdetails.appendChild(paymentDiv);
      });
    } else {
      paymentdetails.innerHTML = "<p>No hay registros de pagos.</p>";
    }
  } catch (error) {
    console.error("Error al cargar payments:", error);
  }
}

loadPayments();