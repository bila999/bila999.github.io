const exchangeArray = [
    { name: 'USD', value: 1 },
    { name: 'EUR', value: 0.88 },
    { name: 'POUND', value: 0.75 },
    { name: 'WON', value: 1433 },
    { name: 'YEN', value: 142 },
    { name: 'YAN', value: 7.31 },
    { name: 'MNT', value: 3537 }
  ];
  
  // dropdown-уудыг populate хийх
  function populateDropdowns() {
    const from = document.getElementById("fromCurrency");
    const to = document.getElementById("toCurrency");
  
    exchangeArray.forEach(currency => {
      const opt1 = new Option(currency.name, currency.name);
      const opt2 = new Option(currency.name, currency.name);
      from.appendChild(opt1);
      to.appendChild(opt2);
    });
  
    from.value = "USD";
    to.value = "MNT";
  }
  
  populateDropdowns();
  
  // Товч дарахад тоо нэмэх
  function appendNumber(num) {
    const input = document.getElementById("amount");
    input.value += num;
  }
  
  // Талбарыг цэвэрлэх
  function clearInput() {
    document.getElementById("amount").value = "";
  }
  
  // Хөрвүүлэх функц
  function convert() {
    const amount = parseFloat(document.getElementById("amount").value);
    const from = document.getElementById("fromCurrency").value;
    const to = document.getElementById("toCurrency").value;
  
    if (isNaN(amount)) {
      document.getElementById("result").innerText = "Хэмжээ оруулна уу.";
      return;
    }
  
    const fromRate = exchangeArray.find(c => c.name === from).value;
    const toRate = exchangeArray.find(c => c.name === to).value;
  
    const converted = amount * (toRate / fromRate);
    document.getElementById("result").innerText =
      `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
  }
  