function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const from = document.getElementById("fromCurrency").value;
    const to = document.getElementById("toCurrency").value;
  
    if (isNaN(amount) || amount <= 0) {
      document.getElementById("result").innerText = "Please enter a valid amount.";
      return;
    }
  
    const rates = {
      USD: { USD: 1, EUR: 0.92, MNT: 3450 },
      EUR: { EUR: 1, USD: 1.09, MNT: 3750 },
      MNT: { MNT: 1, USD: 0.00029, EUR: 0.00027 }
    };
  
    const converted = amount * rates[from][to];
    const rounded = converted.toFixed(2);
  
    document.getElementById("result").innerText =
      `${amount} ${from} = ${rounded} ${to}`;
  }
  