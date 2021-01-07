export default function formatCurrency(num) {
    // return "$" + Number(num.toFixed(1)).toLocaleString() + " ";
    return num.toLocaleString("vi-VI") + " đ";
}