import React, { PureComponent } from "react"

export default class SelectWord extends PureComponent {
    render() {
        const { word, selected, onToggle } = this.props
        return (
            <div>
                <label style={{
                    color: selected ? "green" : "gray",
                    fontWeight: selected ? "bold" : "normal"
                }}>
                    <input
                        ref="checkbox"
                        className="toggle"
                        type="checkbox"
                        checked={selected}
                        onChange={onToggle} /> {word}
                </label>
            </div>
        )
    }
}