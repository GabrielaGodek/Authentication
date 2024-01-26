<template>
    <table>
        <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.type }}</td>
                <td @click="deleteUser(user.id)">
                    <span v-if="user.type !== 'admin'">
                        <button>Delete</button>
                    </span>
                    <span v-else>
                        <button disabled>Delete</button>
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import { requestData } from '../includes/requestData'

interface User {
    id: number;
    username: string;
    email: string;
    type: string;
}

export default defineComponent({
    name: 'AdminPanel',
    setup() {
        let users = ref<User[]>([])

        const deleteUser = async (userId: number): Promise<void> => {
            try {
                await requestData(`users/${userId}`, 'DELETE', undefined, undefined);
                users.value = users.value.filter(user => user.id !== userId);
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
        const fetchUsers = async (): Promise<void> => {
            try {
                const response = await requestData('users', 'GET', undefined, undefined);
                users.value = response.data;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        // watchEffect(() => { users })

        onBeforeMount(fetchUsers);
        return {
            users,
            deleteUser
        }
    }
})
</script>

<style lang="scss">
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    margin-bottom: 20px;

    th,
    td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #03e9f4;
        font-weight: bold;
        color: #242424;
        text-transform: uppercase;
        text-align: center;
        font-size: 22px;
    }

    tbody tr:hover {
        background-color: #f5f5f5;
        color: #242424;
    }

    td:last-child {
        cursor: pointer;
        color: #e74c3c;
        text-decoration: underline;
    }
}
</style>