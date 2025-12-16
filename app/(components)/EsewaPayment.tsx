"use client";

import { generateUniqueId } from "@/utils/helper";
import { FC, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../form.css";
import { initiatePayment } from "@/actions/esewa-payment/post";

type EsewaPaymentFormType = {
  amount: string;
  product_id: string;
};

const EsewaPayment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EsewaPaymentFormType>({
    defaultValues: {
      product_id: generateUniqueId(),
    },
  });

  const [pending, startTransition] = useTransition()

  const handleEsewaPayment: SubmitHandler<EsewaPaymentFormType> = (data) => {
    console.log("data", data);
    startTransition(async() => {
       const url = await initiatePayment(data)
        window.location.href = url.url;
    })
  };

  return (
    <form
      className="form p-[2.5rem] shadow-xl bg-neutral-100 border border-neutral-50 rounded-xl flex flex-col gap-[2rem]"
      onSubmit={handleSubmit(handleEsewaPayment)}
    >
      <h2 className="header-text text-[2.2rem] text-center text-green-700">
        Esewa Payment
      </h2>
      <div className="form-group flex flex-col gap-[0.8rem]">
        <input
          type="number"
          id="amount"
          className={`form-control border border-neutral-800 bg-neutral-100 text-black text-[1.8rem] p-[0.8rem] rounded-md ${
            errors.amount ? "border-red-700! outline-red-700!" : ""
          }`}
          placeholder="Amount"
          {...register("amount", {
            required: {
              value: true,
              message: "Amount is required",
            },
            min: {
              value: 1,
              message: "Amount must be greater than 5",
            },
          })}
        />
        {errors.amount ? (
          <span className="error text-[1.4rem] text-red-700">
            {errors.amount.message}
          </span>
        ) : null}
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
      </div>

      <div className="form-actions flex flex-col gap-[1.5rem]">
        <button type="submit" className="btn bg-green-700 text-white p-[1.2rem_2rem] rounded-xl text-[1.8rem]">
          Pay
        </button>
        <button type="reset" className="btn text-green-700 text-[1.8rem]">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EsewaPayment;
