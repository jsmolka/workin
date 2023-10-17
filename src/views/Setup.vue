<template>
  <Card>
    <Form>
      <Label text="Heart rate monitor">
        <ButtonDevice :device="hrm" />
      </Label>
      <Label text="FTP">
        <Input type="number" value="" />
      </Label>
      <Button brand>Start</Button>
    </Form>
  </Card>
</template>

<script setup>
import { reactive } from 'vue';
import HeartRateMonitor from '../bluetooth/heartRateMonitor';
import Button from '../components/Button.vue';
import ButtonDevice from '../components/ButtonDevice.vue';
import Input from '../components/Input.vue';
import Form from '../components/Form.vue';
import Label from '../components/Label.vue';
import Card from '../components/Card.vue';

const hrm = reactive(new HeartRateMonitor());
</script>
