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

  const [pending, startTransition] = useTransition();

  const handleEsewaPayment: SubmitHandler<EsewaPaymentFormType> = (data) => {
    console.log("data", data);
    startTransition(async () => {
      const url = await initiatePayment(data);
      window.location.href = url.url;
    });
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
          disabled={pending}
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
        {pending ? (
          <>
            <button
              type="button"
              className="btn bg-green-700 text-white p-[1.2rem_2rem] rounded-xl text-[1.8rem] pointer-events-none cursor-not-allowed flex items-center justify-center"
            >
              <span className="icon-container w-[2.5rem] h-[2.5rem] flex items-center justify-center animate-spin">
                <svg
                  className="fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path d="M286.7 96.1C291.7 113 282.1 130.9 265.2 135.9C185.9 159.5 128.1 233 128.1 320C128.1 426 214.1 512 320.1 512C426.1 512 512.1 426 512.1 320C512.1 233.1 454.3 159.6 375 135.9C358.1 130.9 348.4 113 353.5 96.1C358.6 79.2 376.4 69.5 393.3 74.6C498.9 106.1 576 204 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 204 141.1 106.1 246.9 74.6C263.8 69.6 281.7 79.2 286.7 96.1z" />
                </svg>
              </span>
            </button>
          </>
        ) : (
          <>
            <button
              type="submit"
              className="btn bg-green-700 text-white p-[1.2rem_2rem] rounded-xl text-[1.8rem]"
            >
              Pay
            </button>
            <button type="reset" className="btn text-green-700 text-[1.8rem]">
              Cancel
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default EsewaPayment;
