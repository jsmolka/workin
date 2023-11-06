<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  totalSeconds: {
    type: Number,
    required: true,
  },
});
</script>
