<template>
    <div>
        <p>news feed</p>
        <button @click="logout" >logout</button>
    </div>
</template>

<script>
import axios from '../config/axios'

export default {
    setup() {

        const logout = async() => {
            try {
                await axios.get('/sanctum/csrf-cookie')
                await axios.post('/api/logout', { withCredentials: true })
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