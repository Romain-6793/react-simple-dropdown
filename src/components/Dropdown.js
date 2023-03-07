import React from 'react'
import styles from '../styles.module.css'
import { useState, useEffect } from 'react';
import Options from './Options';
import Icon from './Icon';
import PropTypes from 'prop-types'

// Here is the component to be rendered, it takes two props : placeHolder and options (the options array).

const Dropdown = (props) => {

    let { id, placeHolder, options, itemClassName, itemSelectedClassName } = props;
    const {
        containerClassName,
        inputClassName,
        selectedValueClassName,
        toolClassName,
        shownMenuClassName,
        menuClassName,
    } = props;

    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    // The following useEffect allows the user to click anywhere on the page to close the dropdown on 
    // every render.

    useEffect(() => {
        const handler = () => setShowMenu(false)

        window.addEventListener("click", handler)
        return () => {
            window.removeEventListener("click", handler)
        }
    }, [])

    // The following function allows to toggle the menu from shown to hidden and vice versa.
    // Of course, the Options array must be full.

    const handleInputclick = (e) => {
        e.stopPropagation()
        if (options.length !== 0) {
            setShowMenu(!showMenu)
        }
        console.log(showMenu)
    }

    // The following function displays a placeHolder, either the label value of the selected option,
    // or the default placeHolder if none is selected.

    const getDisplay = () => {
        if (selectedValue) {
            return selectedValue.label
        }
        return placeHolder;
    };

    // The two following functions allow to get the selected value equal to the option value clicked (if any),
    // this allows to get in the state the precise option you have clicked and to give it a singular 
    // className, so the option previously clicked will be highlighted.

    const onItemClick = (option) => {
        setSelectedValue(option)
    }

    const isSelected = (option) => {
        if (!selectedValue) {
            return false
        }
        return selectedValue.value === option.value
    }

    // The select tag is used to retrieve the currentValue, it is important that it stays hidden.

    return (
        <div>
            {/* I put a select here if you want to recover the event target value on click or on change */}
            <select
                style={{ display: 'none', }}
                value={selectedValue ? selectedValue.value : ""}
                id={id}
                onChange={onItemClick}
            >
                <option value=""></option>
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                    </option>
                ))}
            </select>
            <div className={containerClassName}>
                <div onClick={handleInputclick} className={inputClassName}>
                    <div className={selectedValueClassName}>{getDisplay()}</div>
                    <div className={toolClassName}>
                        <Icon />
                    </div>
                </div>
            </div>
            {showMenu && (
                <div className={shownMenuClassName}>
                    <div onClick={handleInputclick} className={inputClassName}>
                        <div className={menuClassName}>
                            {options.map((option) => (
                                <div
                                    onClick={() => onItemClick(option)}
                                    key={option.value}
                                    className={isSelected(option) ? itemSelectedClassName : itemClassName}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

};

Dropdown.propTypes = {
    id: PropTypes.string,
    placeHolder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
    })),
    itemClassName: PropTypes.string,
    itemSelectedClassName: PropTypes.string,
    containerClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    selectedValueClassName: PropTypes.string,
    toolClassName: PropTypes.string,
    shownMenuClassName: PropTypes.string,
    menuClassName: PropTypes.string,
}

export default Dropdown