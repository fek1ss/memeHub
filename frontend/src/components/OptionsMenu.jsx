import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { selectMeme } from '../reducers/MemeReducer';

const OptionsMenu = ({ onDelete, memeId, meme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    dispatch(selectMeme(meme));
    handleClose();
    console.log(meme);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleEdit();
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
