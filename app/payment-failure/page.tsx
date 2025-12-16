import Link from "next/link";

export default function PaymentFailurePage() {
  return (
    <div className="success-message w-[min(90%,32rem)] shadow-xl bg-neutral-100 border border-neutral-50 rounded-xl flex flex-col gap-[1.5rem] items-center p-[2.5rem]">
      <Link href={"/"} className="text-red-700 mr-auto">
        Back
      </Link>
      <span className="icon-container w-[7.5rem] h-[7.5rem] flex items-center justify-center">
        <svg className="fill-red-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z" />
        </svg>
      </span>
      <h2 className="text-[2.8rem] text-red-700 font-semibold">
        Payment Failed!
      </h2>
      <p className="text-[1.6rem] text-center">
        Error occured while processing your payment.
      </p>
    </div>
  );
}
