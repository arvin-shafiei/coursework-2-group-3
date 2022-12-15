function customView() {
    let ticker = $("#crypto_ticker").val()
    ticker = ticker.toUpperCase();

    if (ticker.length >= 3) {

        location.href = 'custom/index.html?' + ticker;
    }
}