import React from 'react'
import styles from '../styles.module.css'
import { useState, useEffect } from 'react';
import Options from './Options';
import Icon from './Icon';

// Here is the component to be rendered, it takes two props : placeHolder and options (the options array).

const Dropdown = ({ placeHolder, options }) => {

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
    })

    // The following function allows to toggle the menu from shown to hidden and vice versa.
    // Of course, the Options array must be full.

    const handleInputclick = (e) => {
        e.stopPropagation()
        if (Options.length !== 0) {
            setShowMenu(!showMenu)
        }
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
        console.log(selectedValue)
        return selectedValue.value === option.value
    }

    return (
        <div>
            <div className={styles.dropdownContainer}>
                <div onClick={handleInputclick} className={styles.dropdownInput}>
                    <div className="dropdown-selected-value">{getDisplay()}</div>
                    <div className="dropdown-tool">
                        <Icon />
                    </div>
                </div>
            </div>
            {showMenu && (
                <div className={styles.shownMenu}>
                    <div onClick={handleInputclick} className={styles.dropdownInput}>
                        <div className={styles.dropdownMenu}>
                            {options.map((option) => (
                                <div
                                    onClick={() => onItemClick(option)}
                                    key={option.value}
                                    className={isSelected(option) ? styles.dropdownItemSelected : styles.dropdownItem}
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

export default Dropdown