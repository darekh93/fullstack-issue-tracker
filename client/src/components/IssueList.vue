<template>
  <div>
    <h1>{{ msg }}</h1>

    <AddIssue v-on:addIssue="addIssue($event)" />

    <table cellspacing="0">
        <thead>
            <tr>
                <th>Issue name</th>
                <th>Description</th>
                <th>Created</th>
                <th>Status</th>
                <th>Delete</th>
                <th>Change status</th>
            </tr>
        </thead>
        <tbody v-if="this.issues.length > 0">
            <tr v-for="issue in issues" :key="issue._id">
                <td><strong>{{ issue.title }}</strong></td>
                <td>{{ issue.description }}</td>
                <td>{{ convertDate(issue.created_date) }}</td>
                <td :class="[generateStatusName(issue.status)]">{{ generateStatusName(issue.status) }}</td>
                <td @click="deleteIssue(issue._id)" class="del">X</td>
                <td v-if="issue.status < 2">
                    <div @click="changeStatus(issue._id, issue.status)" class="change">V</div>
                </td>
                <td v-else>Can't change</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>

import * as helpers from "@/helpers";
import AddIssue from "./AddIssue.vue";

export default {
    name: 'IssueList',
    props: {
        msg: String
    },
    components: {
        AddIssue
    },

    data() {
        return {
            issues: []
        }
    },

    mounted() {
        this.getIssues();
    },

    methods: {
        getIssues() {
            fetch("http://localhost:8081/api/issues")
            .then((resp) => {resp.json()
            .then((resp) => {
                this.issues = resp.data;
                })
            })
        },

        addIssue(issue) {
            this.issues.push(issue);
        },

        deleteIssue(id) {
            fetch("http://localhost:8081/api/issues/" + id, {
                method: "DELETE",
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then((resp) => {
                if (resp.status == 200) {
                    this.issues = this.issues.filter((obj) => {
                        return obj._id !== id;
                    });
                }
            })
        },

        changeStatus(id, status) {
            if (status < 2) {
                fetch("http://localhost:8081/api/issues/" + id, {
                method: "PUT",
                body: JSON.stringify({"status": status + 1}),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then((resp) => {
                if (resp.status == 200) {
                    for (let i = 0; i < this.issues.length; i++) {
                        const element = this.issues[i];
                        if (element._id === id) {
                            element.status = element.status + 1;
                        }
                    }
                    // this.issues = this.issues.filter((obj) => {
                    //     return obj._id !== id;
                    // });
                }
            })
            }
        },

        generateStatusName(statusNumber) {
            return helpers.generateStatusName(statusNumber);
        },

        convertDate(timestamp) {
            return helpers.convertDate(timestamp)
        },

    }
}
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
