"use client";

import { wrapFieldsWithMeta } from "tinacms";

export const SliderInput = wrapFieldsWithMeta(({ input }) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        {...input}
        className="w-full"
      />
      <span className="text-sm text-gray-600">
        Value: {input.value ?? 1}
      </span>
    </div>
  );
});

