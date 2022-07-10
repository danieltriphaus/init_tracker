<template>
    <new-participant @add-participant="addParticipant" />
    <combat-controls 
        :number-of-participants="participants.length"
        @combat-index-changed="onCombatIndexChanged"
        @combat-started="onCombatStarted"
        @combat-ended="onCombatEnded"
    />
    <div>
        <template v-for="participant in sortedParticipants" :key="participant.id" >
            <participant-list-item 
                :participant="participant" 
                :isDeleteMode="isDeleteMode" 
                @delete="deleteParticipant"
            />
        </template>
    </div>
    <b-row v-if="participants.length > 0">
        <b-col class="list-controls">
            <b-button variant="danger" squared class="list-control-item" @click="toggleDeleteMode">{{ isDeleteMode ? "Cancel" : "Delete Participants" }}</b-button>
        </b-col>
    </b-row>
</template>

<script setup>
import NewParticipant from './NewParticipant.vue';
import ParticipantListItem from './ParticipantListItem.vue';
import CombatControls from "./CombatControls.vue";

import { ref, computed } from "vue";

const participants = ref([]);
const isDeleteMode = ref(false);

const sortedParticipants = computed(() => {
    const participantsCopy = [...participants.value];
    return participantsCopy.sort((a, b) => {
        if (a.initiative < b.initiative) {
            return 1;
        }
        if (a.initiative > b.initiative) {
            return -1;
        }
        if (a.initiative === b.initiative) {
            return 0;
        }
    });
});

function addParticipant(newParticipant) {
    participants.value.push(newParticipant);
}

function deleteParticipant(id) {
    participants.value.splice(participants.value.findIndex((participant) => participant.id === id), 1)
    if (participants.value.length === 0) {
        toggleDeleteMode()
    }
}

function toggleDeleteMode() {
    isDeleteMode.value = !isDeleteMode.value;
}

function onCombatStarted() {
    sortedParticipants.value[0].hasTurn = true;
}

function onCombatIndexChanged(newCombatIndex, oldCombatIndex) {
    sortedParticipants.value[oldCombatIndex].hasTurn = false;
    sortedParticipants.value[newCombatIndex].hasTurn = true;
}

function onCombatEnded() {
    participants.value.forEach((participant) => {participant.hasTurn = false});
}
</script>

<style scoped>
    

  .list-controls {
    text-align: right;
  }

  .list-control-item {
    display: inline-block;
  }
</style>