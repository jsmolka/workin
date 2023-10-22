<template>
  <Card>
    <Form>
      <Label text="Heart rate monitor">
        <DeviceButton :device="hrm" />
      </Label>
      <Label text="FTP">
        <Input type="number" v-model:value="store.athlete.ftp" />
      </Label>
      <Button blue>Select workout</Button>
    </Form>
  </Card>
</template>

<script setup>
import { reactive } from "vue";
import HeartRateMonitor from "../../bluetooth/heartRateMonitor";
import Button from "../../components/Button.vue";
import DeviceButton from "./DeviceButton.vue";
import Input from "../../components/Input.vue";
import Form from "../../components/Form.vue";
import Label from "../../components/Label.vue";
import Card from "../../components/Card.vue";
import store from "../../store";

const hrm = reactive(new HeartRateMonitor());
</script>
