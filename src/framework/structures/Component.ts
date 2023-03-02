import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    TextInputStyle,
    ModalBuilder,
    TextInputBuilder,
    SelectMenuBuilder, SelectMenuOptionBuilder, ComponentEmojiResolvable
} from "discord.js";

export class Component {
    id: string
    callback: Function

    constructor (id: string, callback: Function) {
        this.id = id
        this.callback = callback
    }
}

export class ButtonOptions {
    label: string
    icon: string | undefined
    style: ButtonStyle
    disabled: boolean

    constructor (label: string, icon?: string, style?: ButtonStyle, disabled?: boolean) {
        this.label = label
        this.icon = icon
        this.style = style || ButtonStyle.Primary
        this.disabled = disabled || false
    }
}

export class Button extends Component {
    options: ButtonOptions

    constructor (id: string, callback: Function, options: ButtonOptions) {
        super(id, callback)
        this.options = options
    }

    build (placeholder?: string): ButtonBuilder {
        const button: ButtonBuilder = new ButtonBuilder()
            .setCustomId(placeholder ? `${this.id}%${placeholder}` : this.id)
            .setLabel(this.options.label)
            .setStyle(this.options.style)

        if (this.options.disabled) button.setDisabled(true)
        if (this.options.icon) button.setEmoji(this.options.icon)

        return button
    }
}

export class TextInputOptions {
    style: TextInputStyle
    required: boolean
    min_length: number | undefined
    max_length: number | undefined

    constructor (style: TextInputStyle, min_length?: number, max_length?: number, required?: boolean) {
        this.style = style
        this.required = required || false

        if (max_length && min_length) {
            if (min_length === max_length) {
                this.min_length = undefined
                this.max_length = undefined
            } else  {
                this.min_length = Math.min(min_length, max_length)
                this.max_length = Math.max(min_length, max_length)
            }
        } else {
            this.min_length = min_length
            this.max_length = max_length
        }
    }
}

export class TextInput {
    id: string
    label: string
    options: TextInputOptions

    constructor (id: string, label: string, options: TextInputOptions) {
        this.id = id
        this.label = label
        this.options = options
    }

    build (): TextInputBuilder {
        const input = new TextInputBuilder()
            .setCustomId(this.id)
            .setLabel(this.label)
            .setStyle(this.options.style)
            .setRequired(this.options.required)

        if (this.options.min_length) input.setMaxLength(this.options.min_length)
        if (this.options.max_length) input.setMaxLength(this.options.max_length)

        return input
    }
}

export class ModalOptions {
    title: string
    fields: ActionRowBuilder<TextInputBuilder>[]

    constructor (title: string, fields: TextInput[]) {
        this.title = title

        this.fields = []
        fields.forEach(field => this.fields.push(new ActionRowBuilder<TextInputBuilder>().setComponents(field.build())))
    }
}

export class Modal extends Component {
    options: ModalOptions

    constructor (id: string, callback: Function, options: ModalOptions) {
        super(id, callback)
        this.options = options
    }

    build (placeholder?: string): ModalBuilder {
        return new ModalBuilder()
            .setCustomId(placeholder ? `${this.id}%${placeholder}` : this.id)
            .setTitle(this.options.title)
            .setComponents(this.options.fields)
    }
}

export class MenuOptions {
    disabled: boolean
    placeholder: string | undefined
    min_values: number | undefined
    max_values: number | undefined

    constructor(disabled?: boolean, placeholder?: string, min_values?: number, max_values?: number) {
        this.disabled = disabled || false
        this.placeholder = placeholder

        if (max_values && min_values) {
            if (min_values === max_values) {
                this.min_values = undefined
                this.max_values = undefined
            } else  {
                this.min_values = Math.min(min_values, max_values)
                this.max_values = Math.max(min_values, max_values)
            }
        } else {
            this.min_values = min_values
            this.max_values = max_values
        }
    }
}

export class MenuField {
    value: string
    label: string
    emoji: ComponentEmojiResolvable
    description: string
    isDefault: boolean

    constructor (value: string, emoji: ComponentEmojiResolvable, label: string, description: string, isDefault?: boolean) {
        this.value = value
        this.label = label
        this.description = description
        this.isDefault = isDefault || false
        this.emoji = emoji
    }

    build (): SelectMenuOptionBuilder {
        return new SelectMenuOptionBuilder()
            .setLabel(this.label)
            .setValue(this.value)
            .setEmoji(this.emoji)
            .setDefault(this.isDefault)
            .setDescription(this.description)
    }
}

export class Menu extends Component {
    fields: SelectMenuOptionBuilder[]
    options: MenuOptions

    constructor (id: string, callback: Function, fields: MenuField[], options: MenuOptions) {
        super(id, callback)
        this.options = options
        this.fields = []
        fields.forEach(field => this.fields.push(field.build()))
    }

    build (placeholder?: string): SelectMenuBuilder {
        const menu: SelectMenuBuilder = new SelectMenuBuilder()
            .setCustomId(placeholder ? `${this.id}%${placeholder}` : this.id)
            .setDisabled(this.options.disabled)
            .setOptions(this.fields)

        if (this.options.placeholder) menu.setPlaceholder(this.options.placeholder)
        if (this.options.min_values) menu.setMinValues(this.options.min_values)
        if (this.options.max_values) menu.setMinValues(this.options.max_values)

        return menu
    }
}