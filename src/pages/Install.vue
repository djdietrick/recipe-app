<template>
    <div class="fullscreen bg-primary">
        <!-- <div v-if="message">
            <p>{{message}}</p>    
        </div> -->
        <q-btn outline class="absolute-center" color="white" label="Install" size="xl" @click="installMe"/>
    </div>
</template>

<script>
import {BeforeInstallPromptEvent} from 'vue-pwa-install';
export default {
    data() {
        return {
            message: null,
            deferredPrompt: null
        }
    },
    methods: {
        installMe() {
            if(!this.deferredPrompt) {
                this.message = "Sorry, you're not able to install on this device :( go yell at David";
                return;
            }
            try {
                this.deferredPrompt.prompt();
                this.deferredPrompt.userChoice.then((res) => {
                    this.message = "Success!";
                })
                this.deferredPrompt = null;
            } catch(e) {
                this.message = e;
            }
           
        }
    },
    created() {
        // window.addEventListener('beforeinstallprompt', (e) => {
        //     e.preventDefault();
        //     this.deferredPrompt = e;
        // })
        this.$on('canInstall', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
        })
    }
}
</script>