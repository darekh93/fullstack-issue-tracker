<template>
    <div class="form-style">
        <h2>Add issue</h2>
        <form @submit.prevent="addIssue">
            <input type="text" placeholder="Issue title" :class="{ 'form-error': $v.title.$error }" v-model.trim="$v.title.$model" /> 
            <textarea placeholder="Issue description" :class="{ 'form-error': $v.description.$error }" v-model.trim="$v.description.$model"></textarea>
            <input type="submit" value="Add Issue" />
        </form>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
    name: 'AddIssue',
    data() {
        return {
            title: "",
            description: ""
        };
    },

    validations: {
        title: {
            required
        },
        description: {
            required
        }
    },
    methods: {
        addIssue() {
            const data = {
                "title": this.title,
                "description": this.description
            }

            this.$v.$touch();
            if(!this.$v.$invalid) {
                fetch('http://localhost:8081/api/issues', {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then((response) => {
                    console.log('Success:', response)
                    this.$emit('addIssue', response.data)
                })
                .catch(error => console.error('Error:', error));
            }
        }
    }
}

</script>

<style scoped lang="scss">
.form-style{
    margin-bottom: 30px;
	max-width: 400px;
	margin: 10px auto;
	padding: 16px;
    background: #F7F7F7;
    h1 {
        background: #4CAF50;
        padding: 20px 0;
        font-size: 140%;
        font-weight: 300;
        text-align: center;
        color: #fff;
        margin: -16px -16px 16px -16px;
    }
    input[type="text"], textarea {
        box-sizing: border-box;
        width: 100%;
        background: #fff;
        margin-bottom: 4%;
        border: 1px solid #ccc;
        padding: 3%;
        color: #555;
        font: 95% Arial, Helvetica, sans-serif;
        &.form-error {
            border: 1px solid red;
        }
    }

    input[type="submit"] {
        box-sizing: border-box;
        width: 100%;
        padding: 3%;
        background: #4CAF50;	
        color: #fff;
        transition: .2s;
        cursor: pointer;
        border: none;
        &:hover {
            opacity: 0.7;
        }
    }
}

</style>
