import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const OptionsMenu = ({ onDelete, memeId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          ✏️ Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onDelete(memeId);
          }}
        >
          🗑️ Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default OptionsMenu;
