import { Input, withStyles, InputAdornment } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import React from "react";
import { Message } from "./message";
import styles from "./message-list.module.css"

const StyledInput = withStyles(() => {
    return {
        root: {
            "&": {
                color: "#9a9fa1",
                padding: "10px 15px",
                fontSize: "15px",
            },
        },
    }
})(Input)

const StyledMessage = withStyles(() => {
    return
})

export class MessageList extends React.Component {
    state = {
        messages: [
            { author: "User", value: "Привет!" },
            { author: "bot", value: "Я робот!" }
            ]
    };

    sendMessage = ({ author, value }) => {
        const { messages } = this.state

        this.setState({
            messages: [...messages, { author, value }],
            value: "",
        })
    }

    handleChangeInput = ({ target }) => {
        this.setState({
            value: target.value,
        })
    }

    handlePressInput = ({ code }) => {
        if (code === "Enter") {
            this.sendMessage({ author: "User", value: this.state.value })
        }
    }

    componentDidUpdate(_, state) {
        const { messages } = this.state

        const lastMessage = messages[messages.length - 1]

        if (lastMessage.author === "User" && state.messages !== messages) {
            setTimeout(() => {
                this.sendMessage({ author: "bot", value: "Как дела ?" })
            }, 500)
        }
    }



    render() {
        const { messages, value } = this.state
        return <div className="message-field">
            <StyledInput
                fullWidth={true}
                value={value}
                onChange={this.handleChangeInput}
                onKeyPress={this.handlePressInput}
                placeholder="Введите сообщение..."
                endAdornment={
                    <InputAdornment position="end">
                        {value && (
                            <Send
                                className={styles.icon}
                                onClick={() => {
                                    this.sendMessage({ author: "User", value })
                                }}
                            />
                        )}
                    </InputAdornment>
                }
            />
            {messages.map((message, index) => (
                <Message message={message} key={index} />
            ))}
        </div>
    }
}
