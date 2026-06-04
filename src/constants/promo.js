export const PROMO_CODES = {
  LUXE10: {
    code: "LUXE10",
    label: "10% off your entire order",
  },
  SAVE50: {
    code: "SAVE50",
    label: "$50 off orders of $200 or more",
  },
};

export const PROMO_PLACEHOLDER = "LUXE10 or SAVE50";

export const PROMO_FOOTNOTE = `* ${PROMO_CODES.LUXE10.code} (${PROMO_CODES.LUXE10.label}), ${PROMO_CODES.SAVE50.code} (${PROMO_CODES.SAVE50.label}).`;
