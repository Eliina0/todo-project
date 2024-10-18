import React from 'react';

const Button = React.memo(({ onClick, children, style }) => {
    
    return (
        <button onClick={onClick} style={style}>
            {children}
        </button>
    );
});

export default Button;
