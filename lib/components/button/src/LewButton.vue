<script setup lang="ts">
import { LewIcon } from 'lew-ui';
import { object2class, getColorType } from 'lew-ui/utils';
import { buttonProps } from './props';

const emit = defineEmits(['click']);
const props = defineProps(buttonProps);

const _loading = ref(false);

const handleClick = async (e: MouseEvent) => {
    if (props.disabled || _loading.value || props.loading) return;
    emit('click', e);
    if (typeof props.request === 'function') {
        if (_loading.value) {
            return;
        }
        _loading.value = true;
        await props.request();
        _loading.value = false;
    }
};
const instance = getCurrentInstance();
const hasDefaultSlot = ref(false);

if (instance?.slots.default) {
    hasDefaultSlot.value = true;
}

const getButtonClass = computed(() => {
    const { size, type, icon, text } = props;
    const loading = _loading.value || props.loading;
    const singleIcon = !!(!text && icon && !hasDefaultSlot.value);
    return object2class('lew-button', {
        size,
        type,
        loading,
        singleIcon,
    });
});

const getIconSize = computed(() => {
    const { size } = props;
    switch (size) {
        case 'small':
            return 12;
        case 'medium':
            return 14;
        case 'large':
            return 16;
        default:
            return 14;
    }
});

const getStyle = computed(() => {
    const { round, type, color, loading } = props;
    const styleObj: Record<string, string> = {};
    const _color = getColorType(color);
    switch (type) {
        case 'fill':
            styleObj.backgroundColor = `var(--lew-color-${_color})`;
            styleObj.color = `var(--lew-color-white)`;
            break;
        case 'light':
            styleObj.backgroundColor = `var(--lew-color-${_color}-light)`;
            styleObj.color = `var(--lew-color-${_color}-dark)`;
            break;
        case 'ghost':
            styleObj.backgroundColor = `transparent`;
            styleObj.border = `1px solid var(--lew-color-${_color})`;
            styleObj.color = `var(--lew-color-${_color}-dark)`;
            styleObj.boxShadow = 'none';
            break;
        case 'text':
            styleObj.backgroundColor = `transparent`;
            styleObj.color = `var(--lew-color-${_color}-dark)`;
            styleObj.boxShadow = 'none';
            break;
        default:
            styleObj.backgroundColor = `var(--lew-color-${_color})`;
            break;
    }
    styleObj.borderRadius = round ? '50px' : 'none';
    return styleObj;
});
</script>

<template>
    <button
        class="lew-button"
        :class="getButtonClass"
        :disabled="disabled"
        :style="getStyle"
        @click="handleClick"
    >
        <lew-icon
            v-if="icon"
            class="lew-button-icon"
            :size="getIconSize"
            :type="icon"
        />
        <lew-icon
            class="lew-loading-icon"
            :size="getIconSize"
            animation="spin"
            animation-speed="fast"
            :class="{
                'lew-loading-isShow': (_loading || loading) && !disabled,
            }"
            type="loader"
        />
        <span v-if="$slots.default || text" class="lew-button-text">
            <template v-if="$slots.default">
                <slot />
            </template>
            <template v-else>
                {{ text }}
            </template>
        </span>
    </button>
</template>

<style lang="scss" scoped>
.lew-button {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    flex-shrink: 0;
    user-select: none;
    width: auto;
    white-space: nowrap;
    box-sizing: border-box;
    transition: transform 0.1s, color 0.35s cubic-bezier(0.65, 0, 0.25, 1),
        padding 0.15s cubic-bezier(0.65, 0, 0.25, 1);
    border: none;
    cursor: pointer;
    border-radius: var(--lew-border-radius);
    box-sizing: border-box;
    overflow: hidden;
    box-shadow: var(--lew-box-shadow);

    .lew-loading-icon {
        position: absolute;
        left: 10px;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    .lew-button-text {
        z-index: 2;
    }

    .lew-loading-isShow {
        opacity: 1;
    }
}

.lew-button::after {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.2);
    transition: 0.1s all;
    opacity: 0;
    content: '';
}

.lew-button-type-ghost::after {
    display: none;
}

.lew-button:hover:after {
    opacity: 0.4;
}

.lew-button:active {
    opacity: 1;
}

.lew-button:active::after {
    opacity: 1;
}

.lew-button-size-small {
    min-width: 50px;
    height: var(--lew-form-item-height-small);
    line-height: var(--lew-form-item-height-small);
    padding: 0px 8px;
    font-size: var(--lew-form-font-size-small);
    gap: 4px;

    .lew-loading-icon {
        left: 8px;
    }
}

.lew-button-size-medium {
    min-width: 60px;
    height: var(--lew-form-item-height-medium);
    line-height: var(--lew-form-item-height-medium);
    padding: 0px 14px;
    font-size: var(--lew-form-font-size-medium);
    gap: 6px;

    .lew-loading-icon {
        left: 10px;
    }
}

.lew-button-size-large {
    min-width: 70px;
    height: var(--lew-form-item-height-large);
    line-height: var(--lew-form-item-height-large);
    padding: 0px 20px;
    font-size: var(--lew-form-font-size-large);
    gap: 8px;

    .lew-loading-icon {
        left: 12px;
    }
}

.lew-button-size-small.lew-button-singleIcon {
    min-width: auto;
    padding: 0px;
    width: var(--lew-form-item-height-small);
    height: var(--lew-form-item-height-small);
}

.lew-button-size-medium.lew-button-singleIcon {
    min-width: auto;
    padding: 0px;
    width: var(--lew-form-item-height-medium);
    height: var(--lew-form-item-height-medium);
}

.lew-button-size-large.lew-button-singleIcon {
    min-width: auto;
    padding: 0px;
    width: var(--lew-form-item-height-large);
    height: var(--lew-form-item-height-large);
}

.lew-button.lew-button-loading.lew-button-singleIcon {
    padding: 0px;

    .lew-button-text {
        display: none;
    }

    .lew-button-icon {
        display: none;
    }

    .lew-loading-icon {
        position: static;
    }
}

.lew-button-loading {
    cursor: progress;
    padding-left: 0px;
}

.lew-button-size-small.lew-button-loading {
    padding-left: 24px;
}

.lew-button-size-medium.lew-button-loading {
    padding-left: 30px;
}

.lew-button-size-large.lew-button-loading {
    padding-left: 36px;
}

.lew-button-loading:active {
    transform: scale(1);
}

.lew-button[disabled] {
    pointer-events: none; //鼠标点击不可修改
    opacity: var(--lew-disabled-opacity);
}
.lew-button-type-ghost:hover {
    background-color: var(--lew-bgcolor-2) !important;
}
.lew-button-type-ghost:active {
    background-color: var(--lew-color-blue-light) !important;
}
</style>
