// currency formatter
export const formatMoney = (amount = 0) => {
  const options = {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  };
  const formatter = Intl.NumberFormat("en-NG", options);

  return formatter.format(amount);
};
