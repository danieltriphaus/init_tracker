<template>
    <form @submit.prevent="addParticipant">
        <b-row class="g-0">
            <b-col cols=6>
                <b-form-input id="new-participant-name" type="text" v-model="participantInput.name" ref="nameInput" placeholder="Name" />
            </b-col>
            <b-col>
                <b-form-input id="new-participant-init" type="number" v-model="participantInput.initiative" placeholder="Initiative" />
            </b-col>
            <b-col>
                <b-form-input id="new-participant-hp" type="number" v-model="participantInput.maxHp" placeholder="HP" />
            </b-col>
            <b-col>
                <b-button type="submit" variant="primary" style="width: 100%" squared>Add</b-button>
            </b-col>
        </b-row>
    </form>
</template>

<script setup>
import { ref } from "vue";
import { nanoid } from "nanoid";

const emit = defineEmits(["add-participant"]);

const participantInputDefaults = {
    name: "",
    initiative: "",
    maxHp: "",
}

const participantInput = ref({...participantInputDefaults});
const nameInput = ref(null);

function addParticipant() {
    const newParticipant = {
        ...participantInput.value,
        initiative: parseInt(participantInput.value.initiative),
        id: nanoid(12),
    }

    if (!newParticipant.maxHp) {
        newParticipant.maxHp = undefined;
    }

    participantInput.value = {...participantInputDefaults};
    nameInput.value.focus();

    emit("add-participant", newParticipant);
}
</script>