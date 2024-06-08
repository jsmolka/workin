<template>
  <input
    :class="
      cn(
        'flex w-full h-8 px-2 py-1.5 bg-shade-7 border rounded-sm transition-colors placeholder:text-shade-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-3 disabled:opacity-50 disabled:cursor-not-allowed',
        props.class,
      )
    "
    :inputmode="inputmode"
    :value="value"
    @input="
      $event.target.value = format($event.target.value);
      clampCursor($event);
    "
    @change="change"
    @focusin="select"
    @keydown="keyDown"
    @mouseup="clampCursor"
    type="text"
    v-bind="$attrs"
  />
</template>

<script setup>
import { useForceUpdate } from '@/composables/useForceUpdate';
import { cn } from '@/utils/ui';
import _ from 'lodash';
import { computed, nextTick } from 'vue';

const modelValue = defineModel({ type: Number, required: false });

const props = defineProps({
  max: { type: Number, default: Number.MAX_SAFE_INTEGER },
  min: { type: Number, default: Number.MIN_SAFE_INTEGER },
  precision: { type: Number, default: 0 },
  unit: { type: String, default: '' },
});

const suffix = computed(() => {
  return props.unit !== '' ? ` ${props.unit}` : '';
});

const unformat = (value) => {
  return suffix.value.length > 0 && value.endsWith(suffix.value)
    ? value.slice(0, -suffix.value.length)
    : value;
};

// Based on https://github.com/nosir/cleave-zen/blob/main/src/numeral/index.ts
const format = (value) => {
  const decimalSeparator = (1.1).toLocaleString().charAt(1);

  value = unformat(value)
    // Strip alphabet letters
    .replace(/[A-Za-z]/g, '')
    // Replace decimal separator with S
    .replace(decimalSeparator, 'S')
    // Strip non-numeric letters except minus and S
    .replace(/[^\dS-]/g, '')
    // Replace S with decimal separator
    .replace('S', decimalSeparator)
    // Replace leading minus with M
    .replace(/^-/, 'M')
    // Strip minuses
    .replace(/-/g, '')
    // Replace M with minus
    .replace('M', '-')
    // Strip zeros
    .replace(/^(-)?0+(?=\d)/, '$1');

  if (value.includes(decimalSeparator)) {
    const [integer, decimal] = value.split(decimalSeparator, 2);
    value =
      props.precision > 0
        ? `${integer}${decimalSeparator}${decimal.slice(0, props.precision)}`
        : integer;
  }
  return (value || '0') + suffix.value;
};

const inputmode = computed(() => {
  return props.precision > 0 ? 'decimal' : 'numeric';
});

const value = computed(() => {
  return modelValue.value != null ? format(modelValue.value.toLocaleString()) : null;
});

let selectionStart = null;
let selectionEnd = null;

const select = (event) => {
  const value = unformat(event.target.value);

  selectionStart = 0;
  selectionEnd = value.length;

  event.target.setSelectionRange(selectionStart, selectionEnd);
};

const keyDown = (event) => {
  switch (event.key) {
    case 'a':
    case 'A':
      if (event.ctrlKey) {
        event.preventDefault();
        select(event);
      }
      break;

    case 'Shift':
      selectionStart = event.target.selectionStart;
      selectionEnd = event.target.selectionEnd;
      break;

    case 'ArrowLeft':
    case 'ArrowUp':
    case 'Home':
    case 'ArrowRight':
    case 'ArrowDown':
    case 'End':
      navigate(event);
      break;
  }
};

const navigate = (event) => {
  const value = unformat(event.target.value);

  switch (event.key) {
    case 'ArrowLeft':
      if (!event.shiftKey && selectionStart !== selectionEnd) {
        selectionEnd = Math.min(selectionStart, selectionEnd);
        break;
      }
    case 'ArrowUp':
    case 'Home': {
      selectionEnd -= !event.ctrlKey && event.key === 'ArrowLeft' ? 1 : value.length;
      break;
    }

    case 'ArrowRight':
      if (!event.shiftKey && selectionStart !== selectionEnd) {
        selectionEnd = Math.max(selectionStart, selectionEnd);
        break;
      }
    case 'ArrowDown':
    case 'End': {
      selectionEnd += !event.ctrlKey && event.key === 'ArrowRight' ? 1 : value.length;
      break;
    }
  }

  selectionEnd = _.clamp(selectionEnd, 0, value.length);
  if (!event.shiftKey) {
    selectionStart = selectionEnd;
  }

  event.preventDefault();
  event.target.setSelectionRange(
    Math.min(selectionStart, selectionEnd),
    Math.max(selectionStart, selectionEnd),
    selectionStart !== selectionEnd
      ? selectionStart <= selectionEnd
        ? 'forward'
        : 'backward'
      : 'none',
  );
};

const clampCursor = (event) => {
  const value = unformat(event.target.value);
  event.target.selectionEnd = Math.min(event.target.selectionEnd, value.length);

  selectionStart = event.target.selectionStart;
  selectionEnd = event.target.selectionEnd;
};

const forceUpdate = useForceUpdate();

const change = async (event) => {
  const value = unformat(event.target.value);
  modelValue.value = _.clamp(parseFloat(value) || 0, props.min, props.max);

  await nextTick();
  forceUpdate();
  await nextTick();
  clampCursor(event);
};
</script>
