<script>
import MobileRecipes from './MobileRecipes.vue';
import DesktopRecipes from './DesktopRecipes.vue';
export default {
    functional: true,
    render: function(h, context) {
        if(window.matchMedia('(max-width: 767px)').matches) {
            return h(MobileRecipes, context.data, context.children)
        } else {
            return h(DesktopRecipes, context.data, context.children)
        }
    }
};
</script>