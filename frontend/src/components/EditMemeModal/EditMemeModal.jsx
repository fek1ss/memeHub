import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { closeModal } from '../../reducers/MemeReducer';
import { useDispatch, useSelector } from 'react-redux';
import { updateMeme } from '../../services/memeService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: 2,
  boxShadow: 24,
};

const EditMemeModal = ({ onUpdate }) => {
  const selectedMeme = useSelector(
    state => state.selectedMeme.selectedMeme,
  );
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.selectedMeme.isEditModal);

  useEffect(() => {
    if (selectedMeme) {
      setTitle(selectedMeme.title);
      setUrl(selectedMeme.image_url);
    }
  }, [selectedMeme]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  // функцтя редактирвоания мема
  const handleSave = async () => {
    try {
      const updatedMeme = await updateMeme(selectedMeme.id, {
        title,
        image_url: url,
      });
      onUpdate(updatedMeme); // Передаёшь обновлённый мем в Home, чтобы обновить список
      handleClose();
    } catch (err) {
      console.error('Error saving meme: ', err);
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Edit Meme
        </Typography>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={e => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Image URL"
          fullWidth
          value={url}
          onChange={e => setUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EditMemeModal;
