<template>
    <b-row class="participant" :class="props.participant.hasTurn ? 'has-turn' : ''">
        <b-col cols="2" class="initiative">
            {{ props.participant.initiative }}
        </b-col>
        <b-col cols="6" class="name">
            {{ props.participant.name }}
        </b-col>
        <b-col cols="4" v-if="props.participant.maxHp && !props.isDeleteMode" class="health">
            <b-row class="g-0">
                <b-col cols="3">HP</b-col>
                <b-col cols="6"><b-form-input type="number" class="current" v-model="currentHp" /></b-col>
                <b-col cols="3">/<b>{{ props.participant.maxHp }}</b></b-col>
            </b-row>
        </b-col>
        <b-col offset="2" v-if="props.isDeleteMode">
            <b-button variant="danger" @click="emit('delete', props.participant.id )" squared size="sm" class="delete-button">Delete</b-button>
        </b-col>
    </b-row>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["participant", "isDeleteMode"]);
const emit = defineEmits(["delete"]);

const currentHp = ref(props.participant.maxHp);
</script>

<style scoped>
    .participant {
        font-size: 1.5rem;
        border-top: 1px solid black;
        padding: 10px 0;
    }

    .participant:last-child {
        border-bottom: 1px solid black;
    }

    .participant .health .current {
        line-height: 1;
    }

    .participant .initiative {
        color: var(--it-primary-color);
        padding-left: 20px;
    }

    .delete-button {
        display: block
    }

    .participant.has-turn {
        border-top: 2px solid red;
    }


    .participant.has-turn:first-of-type + .participant {
        border-top: 2px solid red;
    }

    .participant.has-turn:last-child {
        border-bottom: 2px solid red;
    }
</style>