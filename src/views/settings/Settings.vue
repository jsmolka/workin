<template>
  <Form>
    <Label text="Heart rate monitor">
      <DeviceButton :device="hrm" />
    </Label>
    <Label text="Smart trainer">
      <DeviceButton :device="hrm" />
    </Label>
    <Label text="Height [kg]">
      <Input type="number" v-model:value="store.athlete.height" />
    </Label>
    <Label text="Weight [cm]">
      <Input type="number" v-model:value="store.athlete.weight" />
    </Label>
    <Label text="FTP [W]">
      <Input type="number" v-model:value="store.athlete.ftp" />
    </Label>
  </Form>
</template>

<script setup>
import { reactive } from "vue";
import HeartRateMonitor from "../../bluetooth/heartRateMonitor";
import Form from "../../components/Form.vue";
import Input from "../../components/Input.vue";
import Label from "../../components/Label.vue";
import store from "../../store";
import DeviceButton from "./DeviceButton.vue";

const hrm = reactive(new HeartRateMonitor());
</script>
