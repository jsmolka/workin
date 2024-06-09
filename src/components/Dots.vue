<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon">
        <DotsVerticalIcon class="size-5" />
      </Button>
    </DropdownMenuTrigger>
    <slot />
  </DropdownMenu>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DotsVerticalIcon } from '@radix-icons/vue';
</script>
