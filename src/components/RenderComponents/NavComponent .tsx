import React, { useState } from 'react';
import { removeComponentName } from '../../store/componentNamesSlice';
import { useDispatch } from 'react-redux';

interface NavComponentProps {
    index: number;
}

const NavComponent: React.FC<NavComponentProps> = ({ index }) => {
    const dispatch = useDispatch();
    const [styles, setStyles] = useState<React.CSSProperties>({ border: '2px solid' });

    const openContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        const contextMenu = document.createElement('div');
        contextMenu.className = 'context-menu';

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'button';
        removeButton.addEventListener('click', () => {
            dispatch(removeComponentName(index));
            contextMenu.remove();
        });

        contextMenu.appendChild(removeButton);
        document.body.appendChild(contextMenu);

        const posX = event.clientX;
        const posY = event.clientY;

        contextMenu.style.position = 'absolute';
        contextMenu.style.top = `${posY}px`;
        contextMenu.style.left = `${posX}px`;

        const handleClickOutside = (e: MouseEvent) => {
            if (!contextMenu.contains(e.target as Node)) {
                contextMenu.remove();
                document.removeEventListener('click', handleClickOutside);
            }
        };

        document.addEventListener('click', handleClickOutside);
    };

    return (
        <div
            className='nav-component'
            style={styles}
            onContextMenu={openContextMenu}
        >
            NavComponent
        </div>
    );
};

export default NavComponent;
