<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon">
        <PhDotsThreeVertical class="size-5" weight="bold" />
      </Button>
    </DropdownMenuTrigger>
    <slot />
  </DropdownMenu>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PhDotsThreeVertical } from '@phosphor-icons/vue';
</script>
