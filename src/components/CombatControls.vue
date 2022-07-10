<template>
    <b-row>
        <b-col style="text-align: center;" v-if="!isInCombat && props.numberOfParticipants > 0">
            <b-button variant="primary" squared @click="startCombat">Start Combat</b-button>
        </b-col>

        <template v-if="isInCombat">
            <b-col offset="2"><b-button variant="primary" squared @click="endCombat">End Combat</b-button></b-col>
            <b-col class="turn-number">
                Turn #<b>{{ turnNumber }}</b>
            </b-col>
            <b-col>
                <b-button variant="primary" @click="nextParticipant" squared>Next</b-button>
            </b-col>
        </template>
    </b-row>
</template>

<script setup>
    import { ref } from "vue";

    const props = defineProps(["numberOfParticipants"]);
    const emit = defineEmits(["combatStarted","combatIndexChanged", "combatEnded"]);

    const isInCombat = ref(false);
    const turnNumber = ref(1);
    const currentCombatIndex = ref(0);

    function startCombat() {
        isInCombat.value = true;
        emit("combatStarted");
    }

    function nextParticipant() {
        const oldCombatIndex = currentCombatIndex.value;
        if (currentCombatIndex.value + 1 < props.numberOfParticipants) {
            currentCombatIndex.value++;
        } else if (currentCombatIndex.value + 1 === props.numberOfParticipants) {
            turnNumber.value++;
            currentCombatIndex.value = 0;
        }
        emit("combatIndexChanged", currentCombatIndex.value, oldCombatIndex);
    }

    function endCombat() {
        currentCombatIndex.value = 0;
        turnNumber.value = 1;
        isInCombat.value = false;
        emit("combatEnded");
    }
</script>

<style scoped>

    .turn-number {
        font-size: 1.3rem;
        padding-top: 5px;
    }
    .turn-number b {
        color: var(--it-primary-color);
    }
</style>