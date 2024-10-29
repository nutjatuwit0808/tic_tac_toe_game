import React from "react";

type Props = {
  message: string;
};

export default function SuccessNotification({ message }: Props) {
  return (
    <div
      className="absolute bg-green-100 border border-green-500 text-green-700 px-4 py-3 rounded top-2 right-2"
      role="alert"
    >
      <strong className="font-bold">Success!</strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
}
