'use client';
import React from 'react';
import { wrapFieldsWithMeta } from 'tinacms';

/**
 * Character counter component for textarea fields in TinaCMS
 * Displays real-time character count with recommended range guidance (150-160 characters)
 *
 * Usage in schema:
 * ```ts
 * {
 *   type: 'string',
 *   name: 'description',
 *   ui: {
 *     component: CharacterCounterInput,
 *   },
 * }
 * ```
 */
export const CharacterCounterInput = wrapFieldsWithMeta(({ input, field }) => {
  // SEO best practice: 150-160 characters for meta descriptions
  const recommendedMin = 150;
  const recommendedMax = 160;
  const maxChars = 200; // Allow some overflow but warn

  const currentLength = input.value?.length || 0;
  const isWithinRecommended = currentLength >= recommendedMin && currentLength <= recommendedMax;
  const isOverRecommended = currentLength > recommendedMax;
  const isUnderRecommended = currentLength > 0 && currentLength < recommendedMin;

  // Determine color based on character count
  const getCounterColor = () => {
    if (isOverRecommended) return 'text-orange-600';
    if (isUnderRecommended) return 'text-yellow-600';
    if (isWithinRecommended) return 'text-green-600';
    return 'text-gray-500';
  };

  return (
    <div className='w-full'>
      {/* Hidden input for TinaCMS form handling */}
      <input type='text' id={input.name} className='hidden' {...input} />

      {/* Textarea */}
      <textarea
        id={`${input.name}-textarea`}
        value={input.value || ''}
        onChange={(e) => {
          // Allow input but warn if over recommended
          input.onChange(e.target.value);
        }}
        className='w-full min-h-[100px] px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y'
        aria-label={typeof field.label === 'string' ? field.label : 'Text input'}
        aria-describedby={`${input.name}-counter ${input.name}-description`}
      />

      {/* Character counter and guidance */}
      <div className='mt-2 flex items-center justify-between text-sm'>
        <div className='flex items-center gap-2'>
          <span id={`${input.name}-counter`} className={`font-medium ${getCounterColor()}`} aria-live='polite' aria-atomic='true'>
            {currentLength} characters
          </span>
          {!isWithinRecommended && currentLength > 0 && (
            <span className='text-gray-500 text-xs'>
              (Recommended: {recommendedMin}-{recommendedMax} characters)
            </span>
          )}
        </div>
        {isWithinRecommended && (
          <span className='text-green-600 text-xs font-medium' aria-label='Character count is within recommended range'>
            ✓ Optimal length
          </span>
        )}
      </div>

      {/* Field description */}
      {field.description && (
        <p id={`${input.name}-description`} className='mt-1 text-xs text-gray-500'>
          {field.description}
        </p>
      )}
    </div>
  );
});
