<template>
    <div>
        <p>news feed</p>
        <button @click="logout" >logout</button>
    </div>
</template>

<script>
import { useLoginStore } from '../stores/login/index';

export default {
    setup() {
        const loginStore = useLoginStore();


        const logout = async() => {
            try {
                await loginStore.logout();
            } catch (error) {
                console.log(error)
            }
        } 

        return {
            logout
        }
    },
}
</script>