<template>
    <vue-advanced-chat
      :current-user-id="currentUserId"
      :rooms="rooms"
      :messages="messages"
      :room-actions="roomActions"
    />
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentUserId: '1234',
        rooms: [],
        messages: [],
        roomActions: [
          { name: 'inviteUser', title: 'Invite User' },
          { name: 'removeUser', title: 'Remove User' },
          { name: 'deleteRoom', title: 'Delete Room' }
        ]
      }
    }
  }
  </script>
  