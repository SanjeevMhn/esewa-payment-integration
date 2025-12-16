"use server";

import axios from "axios";
import crypto from "crypto";

function generateHmacSha256Hash(data: string, secret: string) {
  if (!data || !secret) {
    return null;
  }

  const hash = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64");

  return hash;
}

export async function initiatePayment(formData: {
  amount: string;
  product_id: string;
}) {
  const { amount, product_id } = formData;
  const baseUrl =
    process.env.VERCEL_ENV === "production" ||
    process.env.VERCEL_ENV === "preview"
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000";
  const paymentData = {
    amount,
    failure_url: `${baseUrl}${process.env.FAILURE_URL}`,
    product_delivery_charge: "0",
    product_service_charge: "0",
    product_code: process.env.ESEWA_MERCHANT_ID,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    success_url: `${baseUrl}${process.env.SUCCESS_URL}`,
    tax_amount: "0",
    total_amount: amount,
    transaction_uuid: product_id,
  };

  const data = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;
  const signature = generateHmacSha256Hash(data, process.env.ESEWA_SECRET!);

  const paymentConfig = {
    url: process.env.ESEWA_PAYMENT_URL!,
    data: {
      ...paymentData,
      signature,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    responseHandler: (response: any) => response.request?.res?.responseUrl,
  };

  const payment = await axios.post(paymentConfig.url, paymentConfig.data, {
    headers: paymentConfig.headers,
  });

  const paymentUrl = paymentConfig.responseHandler(payment);
  return {
    url: paymentUrl,
  };
}
