<template>
  <input
    :class="
      cn(
        'flex w-full h-8 px-2 py-1.5 bg-shade-7 border rounded-sm overflow-ellipsis placeholder:text-shade-3 disabled:opacity-50 disabled:cursor-not-allowed',
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
    @pointerup="clampCursor"
    type="text"
  />
</template>

<script setup>
import { useForceUpdate } from '@/composables/useForceUpdate';
import { clamp } from '@/utils/numeric';
import { cn } from '@/utils/ui';
import { computed, nextTick } from 'vue';

const modelValue = defineModel({ type: Number, required: false });

const props = defineProps({
  class: { required: false },
  max: { type: Number, default: Number.MAX_SAFE_INTEGER },
  min: { type: Number, default: Number.MIN_SAFE_INTEGER },
  precision: { type: Number, default: 0 },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
});

const unformat = (value) => {
  const { prefix, suffix } = props;
  if (prefix.length > 0 && value.startsWith(prefix)) {
    value = value.slice(prefix.length);
  }
  if (suffix.length > 0 && value.endsWith(suffix)) {
    value = value.slice(0, -suffix.length);
  }
  return value;
};

const decimalSeparator = (1.1).toLocaleString().charAt(1);

// Based on https://github.com/nosir/cleave-zen/blob/main/src/numeral/index.ts
const format = (value) => {
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
  return props.prefix + (value || '0') + props.suffix;
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
  selectionStart = props.prefix.length;
  selectionEnd = event.target.value.length - props.suffix.length;

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
  switch (event.key) {
    case 'ArrowLeft':
      if (!event.shiftKey && selectionStart !== selectionEnd) {
        selectionEnd = Math.min(selectionStart, selectionEnd);
        break;
      }
    case 'ArrowUp':
    case 'Home': {
      selectionEnd -= !event.ctrlKey && event.key === 'ArrowLeft' ? 1 : event.target.value.length;
      break;
    }

    case 'ArrowRight':
      if (!event.shiftKey && selectionStart !== selectionEnd) {
        selectionEnd = Math.max(selectionStart, selectionEnd);
        break;
      }
    case 'ArrowDown':
    case 'End': {
      selectionEnd += !event.ctrlKey && event.key === 'ArrowRight' ? 1 : event.target.value.length;
      break;
    }
  }

  selectionEnd = clamp(
    selectionEnd,
    props.prefix.length,
    event.target.value.length - props.suffix.length,
  );
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
  event.target.selectionEnd = Math.min(
    event.target.selectionEnd,
    event.target.value.length - props.suffix.length,
  );

  selectionStart = event.target.selectionStart;
  selectionEnd = event.target.selectionEnd;
};

const forceUpdate = useForceUpdate();

const change = async (event) => {
  const value = clamp(
    parseFloat(unformat(event.target.value).replaceAll(decimalSeparator, '.')) || 0,
    props.min,
    props.max,
  );
  if (modelValue.value !== value) {
    modelValue.value = value;
  }

  await nextTick();
  forceUpdate();

  await nextTick();
  clampCursor(event);
};
</script>
